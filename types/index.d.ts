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

type Achievement = {
	user: guildMember
	currentTitle: string
	type: string
}