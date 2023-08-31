import { type } from "os"

interface defaultProps extends React.ComponentPropsWithoutRef<"div"> {
	user: User
	fetchInfo: IFetchData
	isAdmin: boolean
	setToastOpen: Dispatch<SetStateAction<boolean>>
	setToastDescription: Dispatch<SetStateAction<string>>
	setToastTitle: Dispatch<SetStateAction<string>>
	setToastColor: Dispatch<SetStateAction<string>>
}

interface ITime {
	user: guildMember
	time_spent: number
}

type APIAchievement = {
	id: string
	username: string
	achievements: Achievement[]
}

type Achievement = {
	name: string
	requirements: string
	type: AchievementType
}

type AchievementType = "TIME" | "MESSAGE" | "BrasilRecieved" | "BrasilSent"