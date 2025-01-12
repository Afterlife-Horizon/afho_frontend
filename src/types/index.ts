import { Dispatch, SetStateAction } from "react"
import { guildMember } from "./discord"
import { IFetchData } from "./music"
import { APIUser } from "discord-api-types/v10"

export interface defaultProps extends React.ComponentPropsWithoutRef<"div"> {
	user: APIUser
	fetchInfo: IFetchData
	isAdmin: boolean
	setToastOpen: Dispatch<SetStateAction<boolean>>
	setToastDescription: Dispatch<SetStateAction<string>>
	setToastTitle: Dispatch<SetStateAction<string>>
	setToastColor: React.Dispatch<React.SetStateAction<"default" | "destructive" | "inform">>
}

export interface ITime {
	user: guildMember
	time_spent: number
}

export type APIAchievement = {
	id: string
	username: string
	achievements: Achievement[]
}

export type Achievement = {
	name: string
	requirements: string
	type: AchievementType
}

export type AchievementType = "TIME" | "MESSAGE" | "BrasilRecieved" | "BrasilSent"
