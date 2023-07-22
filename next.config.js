/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ['storage.googleapis.com'],
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
}

const withPWA = require('next-pwa')({
    customWorkerDir: 'src/worker',
    dest: 'public'
})

module.exports = withPWA(nextConfig)