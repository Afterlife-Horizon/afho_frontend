import { ToastProvider } from "@radix-ui/react-toast"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
	components: {
		MuiAutocomplete: {
			styleOverrides: {
				option: {
					color: "#ffffff"
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
					}
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

const queryClient = new QueryClient()

export const Route = createRootRoute({
	component: () => (
		<QueryClientProvider client={queryClient}>
			<ToastProvider>
				<ThemeProvider theme={theme}>
					<Outlet />
				</ThemeProvider>
			</ToastProvider>
		</QueryClientProvider>
	)
})
