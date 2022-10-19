import { buffer } from "micro";
import * as admin from "firebase-admin";

// https://console.firebase.google.com/u/1/project/clone-751c4/settings/serviceaccounts/adminsdk// Secure a connection to FIREBASE from the backend
var serviceAccount = require("../../permissions.json");

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// Establish connection to stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Find your endpoint's secret in your Dashboard's webhook settings
// --- OR ---
// stripe listen --forward-to localhost:3000/api/webhook
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  // DEBUG USE: uncomment to see session contents
  // console.log("Fulfilling order", session);
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: session.metadata.images,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} has been added to the DB`);
    })
    .catch(console.log);
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    // Verify that the EVENT posted came from STRIPE
    try {
      event = await stripe.webhooks.constructEvent(
        payload,
        sig,
        endpointSecret
      );
    } catch (err) {
      console.log("ERROR", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Fulfill the purchase... db stuff
      return fulfillOrder(session)
        .then(() => {
          return res.status(200).send("");
        })
        .catch((err) => {
          return res.status(400).send(`Webhook Error: ${err.message}`);
        });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
