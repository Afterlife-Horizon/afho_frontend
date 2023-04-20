import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { ToastProvider } from "@/components/ui/toast";

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ToastProvider>
				<Component {...pageProps} />
			</ToastProvider>
		</QueryClientProvider>
	);
}
