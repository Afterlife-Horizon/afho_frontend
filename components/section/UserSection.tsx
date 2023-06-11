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

const UserSection: React.FC<defaultProps> = props => {
	const { user, isAdmin } = props
	const router = useRouter()

	async function handleSignOut() {
		const { error } = await supabase.auth.signOut()
		if (error) return
		router.push("/auth")
	}

	return (
		<section className="grid grid-rows-[10rem_1fr] w-full mx-auto shadow bg-pallete2 rounded-lg text-white">
			<div className={`flex flex-col sm:flex-row justify-between w-full bg-pallete3 rounded-t-lg`}>
				<div className="flex gap-3 w-full items-center p-[2rem]">
					<Avatar className={`rounded-full h-[3rem] w-[3rem] md:h-[5rem] md:w-[5rem] select-none`}>
						<AvatarImage draggable={false} src={user.user_metadata.avatar_url} />
						<AvatarFallback>
							<User />
						</AvatarFallback>
					</Avatar>
					<div className={`text-xl text-white text-[1rem]`}>{user.user_metadata.full_name}</div>
					{isAdmin ? <Badge className="bg-accent1 hover:bg-accent2 text-slate-800">admin</Badge> : null}
				</div>
				<div className={`grid place-items-center w-full sm:w-[20%] mr-5 sm:mr-10`}>
					<Button
						className={`bg-red-500 hover:bg-red-500 hover:scale-105 active:scale-95 px-10 py-5 w-full sm:rounded-full`}
						onClick={handleSignOut}
					>
						Logout
					</Button>
				</div>
			</div>
			<Tabs defaultValue="brasilboard" className="h-[calc(100vh-2rem-10rem)] max-h-[calc(100vh-2rem-10rem)]">
				<TabsList
					className={`w-full md:rounded-none p[0.5rem] gap-1 md:gap-3 md:p-[2rem] h-[4rem] bg-pallete2 [&>*:hover]:bg-accent1 text-white`}
				>
					<TabsTrigger value="brasilboard" className="w-full data-[state=active]:bg-accent2 data-[state=active]:text-white">
						Brasilboard
					</TabsTrigger>
					<TabsTrigger value="levels" className="w-full data-[state=active]:bg-accent2 data-[state=active]:text-white">
						Levels
					</TabsTrigger>
					<TabsTrigger value="times" className="w-full data-[state=active]:bg-accent2 data-[state=active]:text-white">
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
