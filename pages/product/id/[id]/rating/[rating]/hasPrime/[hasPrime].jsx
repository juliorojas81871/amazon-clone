import { useRouter } from "next/router";
import Header from "../../../../../../../components/Header";
import { useEffect, useState } from "react";
import ProductInfo from "../../../../../../../components/ProductInfo";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { getCookie } from "cookies-next";

function ProductDetail({ productInfo }) {
  const router = useRouter();
  const { rating, hasPrime } = router.query;

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="bg-gray-300 h-screen">
        <Head>
          <title>Amazon Clone - {productInfo?.title} </title>
          <link rel="icon" href="/Amazon_icon.jpg" />
        </Head>

        <Header />

        <main className="flex max-w-screen-2xl mx-auto content-center">
          {productInfo && (
            <ProductInfo
              key={productInfo?.id}
              id={productInfo?.id}
              title={productInfo?.title}
              rating={rating}
              price={productInfo?.price}
              description={productInfo?.description}
              category={productInfo?.category}
              image={productInfo?.image}
              hasPrime={hasPrime}
            />
          )}
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = async (req, res) => {
  const {
    query: { id },
  } = req;
  const productInfo = await fetch(
    `https://fakestoreapi.com/products/${id}`
  ).then((res) => res.json());

  const cart = JSON.parse(getCookie("cart", { req, res }) || "[]");

  return {
    props: {
      productInfo,
      cart,
    },
  };
};

export default ProductDetail;
