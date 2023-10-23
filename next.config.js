const BASE_URL = `${process.env.NEXT_PUBLIC_PROTOCOL + process.env.NEXT_PUBLIC_API_URL}`;

/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: [
            "quizit-storage.s3.ap-northeast-2.amazonaws.com",
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**/quizit.org',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000'
            }
        ]
    },
    output: 'standalone',
    poweredByHeader: false,
    reactStrictMode: false,
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