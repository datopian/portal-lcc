const path = require("path");
const fs = require("fs");

const datasetListPath = path.join(__dirname, "public", "old-ckan-datasets-list.json");
const datasetList = fs.existsSync(datasetListPath)
  ? JSON.parse(fs.readFileSync(datasetListPath, "utf8"))
  : [];

const datasetRedirects = datasetList
  .filter((entry) => entry && entry.name && entry.organization)
  .map(({ name, organization }) => ({
    source: `/dataset/${name}/:path*`,
    destination: `/@${organization}/${name}`,
    permanent: true,
  }));

/** @type {import('next').NextConfig} */
const domains = [
  "demo.dev.datopian.com",
  "api.dev.cloud.portaljs",
  "blob.datopian.com",
];
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  publicRuntimeConfig: {
    DOMAINS: domains, // Make domains accessible at runtime
  },
  async redirects() {
    return [
      {
        source: '/groups/:slug',
        destination: '/topics/:slug',
        permanent: true,
      },
      ...datasetRedirects,
    ];
  },
};

module.exports = nextConfig;
