import { fav } from "types/music"

export default async function getUserFavorites(): Promise<{ favorites: fav[] }> {
	const url = "/api/getFavs"
	const token = localStorage.getItem("token")
	if (!token) throw new Error("No token")
	const res = await fetch(url, {
		headers: {
			Authorization: token,
			"Content-Type": "application/json"
		}
	})

	if (res.ok) return res.json()
	throw new Error("Failed to get user")
}
