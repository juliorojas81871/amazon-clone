// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { groupBy } from 'lodash'
const path = require('path')

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

export default async (req, res) => {
    const { items, email } = req.body
  
    const groupedItems = Object.values(groupBy(items, 'id'))
    const transfromedItems = groupedItems.map((group) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: group[0].title,
          images: [group[0].image],
        },
        unit_amount: group[0].price * 100,
      },
      description: group[0].description,
      quantity: group.length,
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: 30,
      },
  }));
  
  //Instead of sending an array of multiple similar values, group them to save space in session
  const groupedImages = Object.values(
    groupBy(items.map((item) => path.basename(item.image)))
  ).map((group) => [group.length, group[0]])

  const session = await stripe.checkout.session.create({
    payment_method_types: ["card"],
    shipping_rate: ["shr_1Lszk7JJobov9ZbE8QLk2xsA"],
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA"],
    },
    line_items: transfromedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
        email,
        images: JSON.stringify(groupedImages),
      },
    })
    console.log('session created', session.id)
    res.status(200).json({ id: session.id })
};


// Use this to test the API and create a session ID
// curl -X POST -is "http://localhost:3000/api/create-checkout-session" -d ""