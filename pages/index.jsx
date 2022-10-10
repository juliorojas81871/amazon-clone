import Head from 'next/head'
import { Header, Banner, ProductFeed } from '../components/index'

const Home = ({products}) => {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
      </div>
      <main className='max-w-screen-2xl mx-auto'>
        {/* Banner */}
        <Banner />
        {/* ProductFeed */}
        <ProductFeed products={products} />
      </main>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
    const products = await fetch("https://fakestoreapi.com/products").then(
      (res) => res.json()
  );
  return {
    props: {
      products,
    },
  };
}
