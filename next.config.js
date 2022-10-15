/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["fakestoreapi.com"],
  },
  reactStrictMode: true,
  env: {
    stipe_public_key: process.env.REACT_APP_STRIPE_PUBLIC_KEY
  },
}
