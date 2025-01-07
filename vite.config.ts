import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
	plugins: [tsconfigPaths(), TanStackRouterVite(), react()],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:4000",
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, "")
			}
		}
	}
})
