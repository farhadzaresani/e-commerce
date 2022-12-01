/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DOMAIN: "https://hotels4.p.rapidapi.com",
    RAPID_KEY: "2197425c35mshbe7742e1668f573p16e59fjsncf336c95ea21",
    RAPID_HOST: "hotels4.p.rapidapi.com",
  },
};

module.exports = nextConfig;
