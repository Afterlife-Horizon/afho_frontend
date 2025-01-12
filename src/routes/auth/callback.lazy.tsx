import { createLazyFileRoute } from "@tanstack/react-router"
import { useEffect } from "react"

export const Route = createLazyFileRoute("/auth/callback")({
	component: RouteComponent
})

function RouteComponent() {
	useEffect(() => {
		async function handleCode(code: string) {
			await fetch("/api/discord/callback?code=" + code + "&redirect_uri=" + window.location.origin + "/auth/callback")
				.then(res => {
					if (!res.ok) {
						throw new Error("Failed to log in")
					}
					return res.json()
				})
				.then(data => {
					// Save token to local storage
					localStorage.setItem("token", data.token)

					window.location.href = window.location.origin
				})
				.catch(err => {
					console.error(err)
				})
		}

		const code = new URLSearchParams(window.location.search).get("code")
		if (code !== null) {
			handleCode(code as string)
		}
	}, [])

	return <div></div>
}
