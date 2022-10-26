import { getCookie } from "cookies-next";
import { Header, Banner, ProductFeed, Footer } from "../components/index";

const Home = ({ productsWithRatings }) => {
  return (
    <div className="bg-gray-100 font-sans">
      <Header />
      <main className="max-h-screen-1xl mx-auto max-w-screen-2xl mb-1">
        {/* Banner */}
        {/* <Banner /> */}
        {/* ProductFeed */}
        <ProductFeed productsWithRatings={productsWithRatings} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

const MAX_RATING = 5;
const MIN_RATING = 1;

export async function getServerSideProps({ req, res }) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  const productsWithRatings = products.map((product) => ({
    ...product,
    rating:
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING,
    hasPrime: Math.random() < 0.5,
  }));

  const cart = JSON.parse(getCookie("cart", { req, res }) || "[]");

  return {
    props: {
      productsWithRatings,
      cart,
    },
  };
}
