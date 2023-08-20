/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: [process.env.S3_URL]
    },
    output: 'standalone',
    poweredByHeader: false,
    reactStrictMode: true,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
    experimental: {
        serverActions: true,
    },
}

const withPWA = require('next-pwa')({
    customWorkerDir: 'src/worker',
    dest: 'public',
    buildExcludes: ["app-build-manifest.json"],
})

module.exports = withPWA(nextConfig)