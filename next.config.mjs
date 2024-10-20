/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
        {
                hostname: 'i.postimg.cc',
            },
        ],
  }
}
  

export default nextConfig;
