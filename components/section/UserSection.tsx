import { supabase } from "@/utils/supabaseUtils"
import Brasil from "./userSection/Brasil"
import Levels from "./userSection/levels"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { useRouter } from "next/router"
import { User } from "lucide-react"
import Times from "./userSection/Times"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { capitalize } from "@/functions/capitalize"

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
		<section className="grid grid-rows-[10rem_1fr] w-full mx-auto shadow bg-background-medium rounded-lg text-dark">
			<div className={`flex flex-col sm:flex-row justify-between w-full bg-background-light rounded-t-lg`}>
				<div className="flex gap-3 w-full items-center p-[2rem]">
					<Avatar className={`rounded-full h-[3rem] w-[3rem] md:h-[5rem] md:w-[5rem] select-none`}>
						<AvatarImage draggable={false} src={user.user_metadata.avatar_url} />
						<AvatarFallback>
							<User />
						</AvatarFallback>
					</Avatar>
					<div className={`text-xl text-dark text-[1rem]`}>{user.user_metadata.full_name}</div>
					{isAdmin ? <Badge className="bg-accent-dark hover:bg-accent-light text-dark">admin</Badge> : null}
				</div>
				<div className={`grid sm:grid-flow-col sm:gap-3 place-items-center w-full sm:w-[70%] mr-5 sm:mr-10`}>
					<Select onValueChange={theme => handleThemeChange(theme)}>
						<SelectTrigger className="bg-accent-dark hover:bg-accent-light border-0 px-10 py-5 w-full sm:rounded-full select-none text-bold">
							<SelectValue placeholder={capitalize(theme)} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>light</SelectLabel>
								{/* <SelectItem value="light-default">Default</SelectItem> */}
							</SelectGroup>
							<SelectGroup>
								<SelectLabel>dark</SelectLabel>
								<SelectItem value="default">Default</SelectItem>
								<SelectItem value="blush">Blush</SelectItem>
								<SelectItem value="mountain-meadow">Mountain Meadow</SelectItem>
								<SelectItem value="java">Java</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<Button
						className={`bg-red-500 hover:bg-red-400 px-10 py-5 w-full sm:rounded-full`}
						onClick={handleSignOut}
					>
						Logout
					</Button>
				</div>
			</div>
			<Tabs defaultValue="brasilboard" className="h-[calc(100vh-2rem-10rem)] max-h-[calc(100vh-2rem-10rem)]">
				<TabsList
					className={`w-full md:rounded-none p[0.5rem] gap-1 md:gap-3 md:p-[2rem] h-[4rem] bg-background-medium [&>*:hover]:bg-accent-light text-dark`}
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
			</Tabs>
		</section>
	)
}

export default UserSection
