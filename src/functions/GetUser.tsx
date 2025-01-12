import { APIUser } from "discord-api-types/v10"

export default async function getUser(jwt: string | null): Promise<{ user: APIUser }> {
	const res = await fetch("/api/user", {
		headers:
			jwt !== null
				? {
						Authorization: jwt
					}
				: {}
	}).then(res => res.json())

	return res
}
