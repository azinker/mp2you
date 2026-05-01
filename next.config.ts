import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    return [
      { source: "/v2", destination: "/", permanent: true },
      { source: "/v2/:path*", destination: "/:path*", permanent: true },
      { source: "/v3", destination: "/", permanent: true },
      { source: "/v3/:path*", destination: "/:path*", permanent: true },
      { source: "/he/v2", destination: "/he", permanent: true },
      { source: "/he/v2/:path*", destination: "/he/:path*", permanent: true },
      { source: "/he/v3", destination: "/he", permanent: true },
      { source: "/he/v3/:path*", destination: "/he/:path*", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-us/", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contact-us/", destination: "/contact", permanent: true },
      { source: "/testimonial", destination: "/testimonials", permanent: true },
      { source: "/testimonial/", destination: "/testimonials", permanent: true },
    ];
  },
};

export default nextConfig;
