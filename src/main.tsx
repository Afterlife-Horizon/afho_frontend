import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createRoute, createRouter } from "@tanstack/react-router"
import "./index.css"
import { rootRoute } from "routes/__root"
import CallbackRouteComponent from "routes/auth/callback.lazy"
import AuthPageRouteComponent from "routes/auth/index.lazy"
import IndexRouteComponent from "routes/index.lazy"

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: IndexRouteComponent
})

const authIndexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/auth",
	component: AuthPageRouteComponent
})

const authCallbackRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/auth/callback",
	component: CallbackRouteComponent
})

const routeTree = rootRoute.addChildren([indexRoute, authIndexRoute, authCallbackRoute])

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

// Render the app
const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	)
}
