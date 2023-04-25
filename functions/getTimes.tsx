export default async function getTimes(): Promise<ITime[]> {
	const url = "/api/times"
	const res = await fetch(url)

	if (res.ok) return res.json()
	throw new Error("Failed to get user")
}
