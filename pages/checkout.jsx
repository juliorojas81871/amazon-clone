import { Header, CheckoutProduct } from "../components/index";
import Image from "next/image";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { useSelector } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import { CSSTransition } from "react-transition-group";
import { currencyFormat } from "../app/currencyFormat";
import { groupBy } from "lodash";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import Head from "next/head";

const stripePromise = loadStripe(process.env.stripe_public_key);
const checkout = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const groupItems = Object.values(groupBy(items, "id"));

  const { data: session } = useSession();

  const createCheckoutSession = async () => {
    // Get Stripe.js instance
    const stripe = await stripePromise;
    // Call your backend to create the Checkout Session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session.user.email,
    });
    // Redirect Customer to Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  const removeCookie = () => {
    deleteCookie("cart");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Amazon Clone - Checkout</title>
        <link rel="icon" href="/Amazon_icon.jpg" />
      </Head>
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="/assets/advertisement2.png"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col space-y-6 bg-white p-5">
            <h1 className="border-b pb-4 font-sans text-3xl font-semibold">
              {items.length === 0
                ? `Your Amazon Basket is Empty.`
                : "Shopping Basket"}
            </h1>
            <TransitionGroup>
              {groupItems.map((group, i) => (
                <CSSTransition
                  key={group[0].image}
                  timeout={500}
                  classNames="item"
                >
                  <CheckoutProduct
                    key={i}
                    id={group[0].id}
                    title={group[0].title}
                    rating={group[0].rating}
                    price={group[0].price}
                    description={group[0].description}
                    category={group[0].category}
                    image={group[0].image}
                    quantity={group.length}
                    hasPrime={group[0].hasPrime}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </div>
        {/* right */}
        <CSSTransition
          in={items.length > 0}
          timeout={300}
          classNames="disappear"
          unmountOnExit
        >
          <div className="my-5 mx-5 flex flex-col bg-white p-3 shadow-md">
            {items.length > 0 && (
              <>
                <h2 className="whitespace-nowrap text-center text-xl font-semibold">
                  Subtotal ({items.length} items):{" "}
                  <span className="ml-1 text-xl font-bold text-gray-800">
                    {currencyFormat(total)}
                  </span>
                </h2>
                <button
                  disabled={!session}
                  role="link"
                  onClick={() => {
                    createCheckoutSession();
                    removeCookie();
                  }}
                  className={`button mt-2 ${
                    !session &&
                    "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {!session ? "Sign In to Checkout" : "Proceed to Checkout"}
                </button>
              </>
            )}
          </div>
        </CSSTransition>
      </main>
    </div>
  );
};

export const getServerSideProps = ({ req, res }) => {
  const cart = JSON.parse(getCookie("cart", { req, res }) || "[]");

  return {
    props: {
      cart,
    },
  };
};

export default checkout;
