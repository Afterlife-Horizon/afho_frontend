import { supabase } from "@/utils/supabaseUtils"
import Brasil from "./userSection/Brasil"
import Levels from "./userSection/levels"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { useRouter } from "next/router"
import Times from "./userSection/Times"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import Achievements from "./userSection/Achievements"
import { defaultProps } from "@/types"
import { User as LucidUser } from "lucide-react"
import { User } from "@supabase/supabase-js"

type theme = {
	name: string
	displayName: string
}

interface props extends defaultProps {
	theme: string
	setTheme: React.Dispatch<React.SetStateAction<string>>
}

const UserSection: React.FC<props> = props => {
	const { user, isAdmin, theme, setTheme } = props
	const router = useRouter()

	async function handleSignOut() {
		const { error } = await supabase.auth.signOut()
		if (error) return
		router.push("/auth")
	}

	function handleThemeChange(theme: string) {
		setTheme(theme)
		localStorage.setItem("theme", theme)
	}

	return (
		<section className="mx-auto grid w-full grid-rows-[10rem_1fr] rounded-lg bg-background-medium text-dark shadow">
			<div className={`flex w-full flex-col justify-between rounded-t-lg bg-background-light sm:flex-row`}>
				<UserProfile user={user} isAdmin={isAdmin} />
				<div className={`mr-5 grid w-full place-items-center sm:mr-10 sm:w-[70%] sm:grid-flow-col sm:gap-3`}>
					<ThemeSelector theme={theme} handleThemeChange={handleThemeChange} />
					<Button className={`w-full bg-red-500 px-10 py-5 hover:bg-red-400 sm:rounded-full`} onClick={handleSignOut}>
						Logout
					</Button>
				</div>
			</div>
			<Tabs defaultValue="brasilboard" className="h-[calc(100dvh-2rem-10rem)] max-h-[calc(100dvh-2rem-10rem)]">
				<TabsList
					className={`p[0.5rem] h-[4rem] w-full gap-1 bg-background-medium text-dark md:gap-3 md:rounded-none md:p-[2rem] [&>*:hover]:bg-accent-light`}
				>
					<TabsTrigger value="brasilboard" className="w-full data-[state=active]:bg-accent-dark data-[state=active]:text-dark">
						Brasilboard
					</TabsTrigger>
					<TabsTrigger value="levels" className="w-full data-[state=active]:bg-accent-dark data-[state=active]:text-dark">
						Levels
					</TabsTrigger>
					<TabsTrigger value="times" className="w-full data-[state=active]:bg-accent-dark data-[state=active]:text-dark">
						Time
					</TabsTrigger>
					<TabsTrigger value="achievements" className="w-full data-[state=active]:bg-accent-dark data-[state=active]:text-dark">
						Achievements
					</TabsTrigger>
				</TabsList>
				<TabsContent value="brasilboard" className="mt-0">
					<Brasil {...props} />
				</TabsContent>
				<TabsContent value="levels" className="mt-0">
					<Levels {...props} />
				</TabsContent>
				<TabsContent value="times" className="mt-0">
					<Times {...props} />
				</TabsContent>
				<TabsContent value="achievements" className="mt-0">
					<Achievements {...props} />
				</TabsContent>
			</Tabs>
		</section>
	)
}

const UserProfile = ({ user, isAdmin }: { user: User; isAdmin: boolean }) => {
	return (
		<div className="flex w-full items-center gap-3 p-[2rem]">
			<Avatar className={`h-[3rem] w-[3rem] select-none rounded-full md:h-[5rem] md:w-[5rem]`}>
				<AvatarImage draggable={false} src={user.user_metadata.avatar_url} />
				<AvatarFallback>
					<LucidUser />
				</AvatarFallback>
			</Avatar>
			<div className={`text-[1rem] text-xl text-dark`}>{user.user_metadata.full_name}</div>
			<AdminBadge isAdmin={isAdmin} />
		</div>
	)
}

const darkThemes: theme[] = [
	{
		name: "default",
		displayName: "Purple"
	},
	{
		name: "blush",
		displayName: "Blush"
	},
	{
		name: "mountain-meadow",
		displayName: "Mountain Meadow"
	},
	{
		name: "java",
		displayName: "Java"
	}
]

const themetypes = {
	dark: {
		name: "Dark",
		themes: darkThemes
	}
}

const allThemes: theme[] = []

Object.keys(themetypes).forEach(key => {
	const type = themetypes[key as keyof typeof themetypes]
	type.themes.forEach(theme => {
		allThemes.push(theme)
	})
})
const ThemeSelector = ({ theme, handleThemeChange }: { theme: string; handleThemeChange: (theme: string) => void }) => {
	return (
		<Select onValueChange={(theme: string) => handleThemeChange(theme)}>
			<SelectTrigger className="text-bold w-full select-none border-0 bg-accent-dark px-10 py-5 font-medium transition-colors hover:bg-accent-light sm:rounded-full">
				<SelectValue placeholder={allThemes.find(th => th.name === theme)?.displayName || null} />
			</SelectTrigger>
			<SelectContent>
				{Object.keys(themetypes).map(key => {
					const type = themetypes[key as keyof typeof themetypes]
					const name = type.name
					const themes = type.themes
					return (
						<SelectGroup key={name}>
							<SelectLabel>{name}</SelectLabel>
							{themes.map(theme => (
								<SelectItem key={theme.name} value={theme.name}>
									{theme.displayName}
								</SelectItem>
							))}
						</SelectGroup>
					)
				})}
			</SelectContent>
		</Select>
	)
}

const AdminBadge = ({ isAdmin }: { isAdmin: boolean }) => {
	if (!isAdmin) return null
	return <Badge className="bg-accent-dark text-dark hover:bg-accent-light">admin</Badge>
}

export default UserSection
