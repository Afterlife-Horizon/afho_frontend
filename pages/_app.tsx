import "@/styles/globals.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { AppProps } from "next/app"
import { ToastProvider } from "@/components/ui/toast"
import Head from "next/head"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ToastProvider>
				<Head>
					<meta charSet="UTF-8" />
					<meta name="description" content="Music page for Afterlife Horizon Discord server Bot" />
					<meta name="keywords" content="Afterlife Horizon, Afterlife, Horizon, Discord, Bot, Music, Music Bot, Music Page" />
					<meta name="author" content="Afterlife Horizon" />
					<meta name="robots" content="nosnippet, notranslate" />
					<link rel="icon" href="/afterlifehorizon.ico" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<title>Afterlife Horizon</title>
				</Head>
				<Component {...pageProps} />
			</ToastProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
