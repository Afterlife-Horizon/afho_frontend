import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { ToastProvider } from "@/components/ui/toast";
import Head from "next/head";

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ToastProvider>
				<Head>
					<meta charSet="UTF-8" />
					<link rel="icon" href="/afterlifehorizon.ico" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<title>Afterlife Horizon</title>
				</Head>
				<Component {...pageProps} />
			</ToastProvider>
		</QueryClientProvider>
	);
}
