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
}

const withPWA = require('next-pwa')({
    customWorkerDir: 'src/worker',
    dest: 'public'
})

module.exports = withPWA(nextConfig)