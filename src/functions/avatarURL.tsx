import { APIUser } from "discord-api-types/v10"

export default function avatarURL(user: APIUser, size: number = 128): string {
	return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=${size}`
}
