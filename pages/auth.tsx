import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../utils/supabaseUtils";

import "../styles/auth.module.css";

const AuthPage = () => {
	return (
		<div className="discord-login">
			<Auth
				supabaseClient={supabase}
				onlyThirdPartyProviders={true}
				redirectTo={process.env.SUPABASE_REDIRECT_URI}
				appearance={{
					className: {
						button: "blue-button",
						loader: "spinner",
					},
				}}
				providers={["discord"]}
			/>
		</div>
	);
};

export default AuthPage;
