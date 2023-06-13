import "@/styles/globals.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { AppProps } from "next/app"
import { ToastProvider } from "@/components/ui/toast"
import Head from "next/head"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
	components: {
		MuiAutocomplete: {
			styleOverrides: {
				option: {
					color: "#ffffff",
				},
				popper: {
					backgroundColor: "#2d2d2d",
					color: "#ffffff"
				},
				listbox: {
					backgroundColor: "#2d2d2d",
					color: "#ffffff"
				},
				inputRoot: {
					"&:before": {
						borderBottom: "1px solid #1d1d1d"
					},
					"&:hover": {
						"&:before": {
							borderBottom: "1px solid",
							borderBottomColor: "var(--twc-accent-dark) !important"
						}
					},
				}
			}
		},
		MuiFilledInput: {
			styleOverrides: {
				root: {
					"&:after": {
						borderBottom: "2px solid",
						borderBottomColor: "var(--twc-accent-dark) !important"
					}
				}
			}
		}
	},
	palette: {
		primary: {
			main: "#ffffff",
			contrastText: "#000000"
		},
		secondary: {
			main: "#121212",
			contrastText: "#ffffff"
		},
		background: {
			default: "#2d2d2d",
			paper: "#2d2d2d"
		},
		text: {
			primary: "#ffffff",
			secondary: "#ffffff"
		}
	}
})

export const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ToastProvider>
				<ThemeProvider theme={theme}>
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
				</ThemeProvider>
			</ToastProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
