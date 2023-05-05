import { supabase } from "../utils/supabaseUtils"
import type { NextPage } from "next"
import { Button } from "@/components/ui/button"
import { FaDiscord } from "react-icons/fa"

const AuthPage: NextPage = () => {
	async function handleLogin() {
		await supabase.auth.signInWithOAuth({
			provider: "discord",
			options: {
				scopes: "identify",
				redirectTo: process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URI || "http://localhost:3000"
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

export default AuthPage
