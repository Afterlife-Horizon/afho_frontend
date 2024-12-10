/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
    		ignoreDuringBuilds: true,
	},
	reactStrictMode: true,
	images: {
		minimumCacheTTL: 60,
		remotePatterns: [
			{
				hostname: "cdn.tosavealife.com"
			},
			{
				hostname: "via.placeholder.com"
			},
			{
				hostname: "i.ytimg.com"
			},
			{
				hostname: "img.youtube.com"
			},
			{
				hostname: "cdn.discordapp.com"
			}
		]
	},
	crossOrigin: "anonymous",
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "http://127.0.0.1:4000/:path*" //https://api.afterlifehorizon.net
			}
		]
	},
	async headers() {
		return [
			{
				source: "/api/:path*",
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: "*"
					},
					{
						key: "Access-Control-Allow-Methods",
						value: "GET,OPTIONS,PATCH,DELETE,POST,PUT"
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
					},
					{
						key: "Access-Control-Allow-Credentials",
						value: "true"
					}
				]
			}
		]
	}
}

module.exports = nextConfig
