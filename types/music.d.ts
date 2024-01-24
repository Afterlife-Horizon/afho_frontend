type fav = {
	id: string
	user_id: string
	name: string
	url: string
	thumbnail: string
	type: "video" | "playlist"
	date_added: string
}

type Effects = {
	speed: number
	bassboost: number
	subboost: boolean
	mcompand: boolean
	haas: boolean
	gate: boolean
	karaoke: boolean
	flanger: boolean
	pulsator: boolean
	surrounding: boolean
	"3d": boolean
	vaporwave: boolean
	nightcore: boolean
	phaser: boolean
	normalizer: boolean
	tremolo: boolean
	vibrato: boolean
	reverse: boolean
	treble: boolean
}

type track = {
	author: string
	duration: number
	durationFormatted: string
	id: string
	requester: string
	thumbnail: string
	title: string
}

type channel = {
	iconURL: string
	id: string
	name: string
	type: string
	url: string
	subsribers: any
	verified: boolean
}

type thumbnail = {
	id: string
	width: number
	height: number
	url: string
}

type queueItem = {
	[x: number]: Number
	effects: Effects
	paused: boolean
	queueloop: boolean
	skipped: boolean
	textChannel: string
	trackloop: boolean
	tracks: track[]
	volume: number
}

interface IFetchData {
	admins: string[]
	formatedprog: string
	prog: number
	queue: queueItem[]
}

type admin = {
	[0]: discordUser
	[1]: {
		avatar: any
		avatarURL: any
		comunicationDisabledUntilTimestamp: any
		displayAvatarURL: string
		displayName: String
		guildId: string
		joinedTimestamp: any
		nickname: string
		pending: boolean
		premiumSinceTimestamp: number
		roles: string[]
		uderId: string
	}
}
