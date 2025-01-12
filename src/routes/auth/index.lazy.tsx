import { createLazyFileRoute } from "@tanstack/react-router"
import { Button } from "../../components/ui/button"
import { FaDiscord } from "react-icons/fa"

const AuthPage = () => {
	async function handleLogin() {
		window.location.href = window.location.origin + "/api/discord/login?redirect_uri=" + window.location.origin + "/auth/callback"
	}

	return (
		<div className="discord-login">
			<div>
				<Button className="blue-button" onClick={async () => await handleLogin()}>
					<FaDiscord size={"1.5rem"} className="mr-2" />
					Login with Discord
				</Button>
			</div>
		</div>
	)
}

export const Route = createLazyFileRoute("/auth/")({
	component: AuthPage
})
