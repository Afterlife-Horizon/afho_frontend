/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["via.placeholder.com"],
	},
	crossOrigin: "anonymous",
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "https://music.afterlifehorizon.net/api/:path*",
			},
		];
	},
};

module.exports = nextConfig;
