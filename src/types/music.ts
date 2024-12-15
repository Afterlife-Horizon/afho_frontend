import { discordUser } from "./discord"

export type fav = {
	id: string
	user_id: string
	name: string
	url: string
	thumbnail: string
	type: "video" | "playlist"
	date_added: string
}

export type Effects = {
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

export type track = {
	author: string
	duration: number
	durationFormatted: string
	id: string
	requester: string
	thumbnail: string
	title: string
}

export type channel = {
	iconURL: string
	id: string
	name: string
	type: string
	url: string
	subsribers: never
	verified: boolean
}

export type thumbnail = {
	id: string
	width: number
	height: number
	url: string
}

export type queueItem = {
	[x: number]: number
	effects: Effects
	paused: boolean
	queueloop: boolean
	skipped: boolean
	textChannel: string
	trackloop: boolean
	tracks: track[]
	volume: number
}

export interface IFetchData {
	admins: string[]
	formatedprog: string
	prog: number
	queue: queueItem[]
}

export type admin = {
	[0]: discordUser
	[1]: {
		avatar: string
		avatarURL: string
		comunicationDisabledUntilTimestamp: number
		displayAvatarURL: string
		displayName: string
		guildId: string
		joinedTimestamp: number
		nickname: string
		pending: boolean
		premiumSinceTimestamp: number
		roles: string[]
		uderId: string
	}
}
