/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use default `.next` output so Vercel’s Next.js deployment finds the build (custom distDir breaks deploys).
  transpilePackages: ["lottie-web"],
  experimental: {
    // Avoid barrel-import issues with lucide-react (can contribute to broken React resolution in dev).
    optimizePackageImports: ["lucide-react"],
  },
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
