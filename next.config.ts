import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  experimental: {
    serverActions: {
      // Default is 1MB, which retina screenshots and most PDFs exceed —
      // addFileSource (dashboard/sources) uploads go through this action.
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
