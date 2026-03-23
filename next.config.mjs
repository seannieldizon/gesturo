/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  transpilePackages: ["lottie-web"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
