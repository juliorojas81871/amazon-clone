import { Header } from "../components";
import Confetti from "react-confetti";
import { useRouter } from "next/router";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { getCookie } from "cookies-next";
import Head from "next/head";

const success = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Amazon Clone - Order Success</title>
        <link rel="icon" href="/Amazon_icon.jpg" />
      </Head>
      <Confetti
        height={765}
        width={800}
        recycle={false}
        className="mx-auto my-4 duration-75"
      />
      <Header />
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank you, your order has been confirmed!
            </h1>
          </div>
          <p>
            Thank you for shopping with us. We'll send a confirmation once your
            item has shipped, if you would like to check the status of your
            order(s) please press the link below.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="button mt-8"
          >
            Go to my orders
          </button>
        </div>
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

export default success;
