type guildMember = {
	guildId: string
	joinedTimestamp: number
	premiumSinceTimestamp: number | null
	nickname: null | string
	pending: boolean
	communicationDisabledUntilTimestamp: number | null
	userId: string
	avatar: string | null
	displayName: string
	roles: string[]
	avatarURL: string | null
	displayAvatarURL: string
}

type discordUser = {
	id: string
	username: string
	discriminator: string
	avatar: string
	displayAvatarURL: string
	bot: boolean
	system: boolean
	flags: number
	createdTimestamp: number
	defaultAvatarURL: string
	tag: string
}

type user = {
	id: string
	bot: boolean
	system: boolean
	flags: number
	username: string
	discriminator: string
	avatar: string
	createdTimestamp: number
	defaultAvatarURL: string
	tag: string
	avatarURL: string
	displayAvatarURL: string
}
