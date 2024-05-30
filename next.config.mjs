/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    pocketBaseUser: process.env.POCKETBASE_USER,
    pocketBasePassword: process.env.POCKETBASE_PASSWORD,
  },
}

export default nextConfig
