export default async function getAchievements() {
	const res = await fetch("/api/achievements")

	if (res.ok) return res.json()
	throw new Error("Failed to get user")
}
