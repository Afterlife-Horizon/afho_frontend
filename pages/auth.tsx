import { Auth } from "@supabase/auth-ui-react"
import { supabase } from "../lib/supabaseUtils"
import type { NextPage } from "next"

const AuthPage: NextPage = () => {
	return (
		<div className="discord-login">
			<Auth
				supabaseClient={supabase}
				onlyThirdPartyProviders={true}
				redirectTo={process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URI}
				appearance={{
					className: {
						button: "blue-button",
						loader: "spinner"
					}
				}}
				providers={["discord"]}
			/>
		</div>
	)
}

export default AuthPage
