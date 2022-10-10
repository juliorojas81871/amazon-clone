import type { NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../components/index'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Amazon Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
      </div>
      <main className='max-w-screen-2xl mx-auto'>
        {/* Banner */}
        {/* ProductFeed */}
      </main>
    </div>
  )
}

export default Home
