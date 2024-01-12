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
	channel: channel
	description: any
	duration: number
	durationFormatted: string
	id: string
	likes: number
	live: boolean
	nsfw: string
	private: boolean
	requester: discordUser
	thumbnail: thumbnail
	title: string
	shorts: boolean
	tags: string[]
	unlisted: boolean
	uploadedAt: string
	views: number
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
	[x: number]: number
	bitrate: number
	creator: String
	effects: effects
	filtersChanged: boolean
	paused: boolean
	queueloop: boolean
	skipped: boolean
	textChannel: string
	trackloop: boolean
	tracks: track[]
	volume: number
}

interface IFetchData {
	admins: {
		admins: admin[]
		usernames: string[]
	}
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
