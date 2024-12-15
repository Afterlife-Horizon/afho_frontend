import { createLazyFileRoute } from "@tanstack/react-router"
import { supabase } from "../utils/supabaseUtils"
import { Button } from "../components/ui/button"
import { FaDiscord } from "react-icons/fa"

const AuthPage = () => {
	async function handleLogin() {
		await supabase.auth.signInWithOAuth({
			provider: "discord",
			options: {
				scopes: "identify",
				redirectTo: import.meta.env.VITE_SUPABASE_REDIRECT_URI || "http://localhost:5173"
			}
		})
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

export const Route = createLazyFileRoute("/auth")({
	component: AuthPage
})
