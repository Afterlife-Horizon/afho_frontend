export function createYTLinkFromId(id?: string): string {
	if (!id) return ""
	return `https://www.youtube.com/watch?v=${id}`
}

export function createYTPlaylistLinkFromId(id?: string): string {
	if (!id) return ""
	return `https://www.youtube.com/playlist?list=${id}`
}
