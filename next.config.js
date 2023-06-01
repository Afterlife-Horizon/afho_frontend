/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		minimumCacheTTL: 60,
		domains: ["via.placeholder.com", "cdn.tosavealife.com", "i.ytimg.com", "img.youtube.com"]
	},
	crossOrigin: "anonymous",
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "https://api.afterlifehorizon.net/:path*"
			}
		]
	}
}

module.exports = nextConfig
