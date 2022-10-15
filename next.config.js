module.exports = {
  images: {
    domains: ["fakestoreapi.com"],
  },
  mode: 'universal',
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY
  },
}
