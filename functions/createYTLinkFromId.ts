export default function createYTLinkFromId(id?: string): string {
	if (!id) return ""
	return `https://www.youtube.com/watch?v=${id}`
}
