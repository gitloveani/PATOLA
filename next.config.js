/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Add other headers like CSP or HSTS as needed,
          // but CSP can be complex and might require specific directives
          // based on your application's needs (e.g., allowing Cloudinary domains).
          // For now, we'll stick to these common ones.
        ],
      },
    ];
  },
};

module.exports = nextConfig;
