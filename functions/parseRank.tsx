export default function parseRank(rank: number): string {
	switch (rank % 10) {
		case 1:
			return "st"
		case 2:
			return "nd"
		case 3:
			return "rd"
		default:
			return "th"
	}
}
