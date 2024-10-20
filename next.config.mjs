/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.postimage.cc',
        port: '',
        pathname: '/*',
      },
    ],
  }
}
  

export default nextConfig;
