export default function ytThumbnailLink(
	videoId?: string,
	size: "default" | "hqdefault" | "mqdefault" | "sddefault" | "maxresdefault" = "default"
): string {
	if (!videoId) return "https://cdn.tosavealife.com/wp-content/uploads/2018/05/Waiting-Memes-52918.jpg"
	return `http://img.youtube.com/vi/${videoId}/${size}.jpg`
}
