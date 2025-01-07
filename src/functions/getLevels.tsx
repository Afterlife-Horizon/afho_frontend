export default async function getLevels() {
	const url = "/api/levels"
	const res = await fetch(url, {
		method: "GET",
		headers: {
			"allow-origin": "*",
			"Content-Type": "application/json"
		}
	})

	if (res.ok) return res.json()

	throw new Error("Something went wrong")
}
