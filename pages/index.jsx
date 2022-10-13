import Head from "next/head";
import { Header, Banner, ProductFeed, Footer } from "../components/index";

const Home = ({ productsWithRatings }) => {
  return (
    <div className="bg-gray-100 font-sans">
      <Head>
        <title>Amazon Clone</title>
        <link rel="icon" href="/Amazon_icon.jpg" />
      </Head>
      <div>
        <Header />
      </div>
      <main className="max-h-screen-1xl mx-auto max-w-screen-2xl">
        {/* Banner */}
        <Banner />
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

export async function getServerSideProps() {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  const productsWithRatings = products.map((product) => ({
    ...product,
    rating:
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING,
    hasPrime: Math.random() < 0.5,
  }));

  return {
    props: {
      productsWithRatings,
    },
  };
}
