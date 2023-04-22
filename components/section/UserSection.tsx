import { supabase } from "@/utils/supabaseUtils";
import Brasil from "./userSection/Brasil";
import Favorites from "./userSection/Favorites";
import Filters from "./userSection/Filters";
import Levels from "./userSection/levels";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useRouter } from "next/router";
import { User } from "lucide-react";
import useWindowSize from "@/hooks/useWindowSize";

const UserSection: React.FC<defaultProps> = ({ user, fetchInfo, isAdmin, setToastDescription, setToastOpen, setToastTitle, setToastColor }) => {
	const router = useRouter();
	const windowSize = useWindowSize();

	async function handleSignOut() {
		const { error } = await supabase.auth.signOut();
		if (error) return;
		router.push("/auth");
	}

	return (
		<section className="flex flex-col flex-grow w-[90%] mx-auto shadow max-h-[100%] bg-pallete2 rounded-lg text-white">
			<div className={`flex ${windowSize.width && windowSize.width < 600 ? "flex-col" : ""} justify-between w-full bg-pallete3 rounded-t-lg`}>
				<div className="flex gap-3 w-full h-[10rem] items-center p-[2rem]">
					<Avatar className={`rounded-full ${windowSize.width && windowSize.width < 700 ? "h-[3rem] w-[3rem]" : "h-[5rem] w-[5rem]"}`}>
						<AvatarImage src={user.user_metadata.avatar_url} />
						<AvatarFallback>
							<User />
						</AvatarFallback>
					</Avatar>
					<div className={`text-xl text-white ${windowSize.width && windowSize.width < 700 ? "text-[1rem]" : ""}`}>{user.user_metadata.full_name}</div>
					{isAdmin ? <Badge className="bg-accent1 hover:bg-accent2 text-slate-800">admin</Badge> : null}
				</div>
				<div className={`grid place-items-center  ${windowSize.width && windowSize.width < 600 ? "w-full" : "w-[30%]"}  mr-5`}>
					<Button
						className={`bg-red-500 hover:bg-red-500 hover:scale-105 active:scale-95 px-10 py-5 ${windowSize.width && windowSize.width < 600 ? "w-full" : "rounded-full"}`}
						onClick={handleSignOut}
					>
						Logout
					</Button>
				</div>
			</div>
			<Tabs defaultValue="favorites">
				<TabsList className={`w-full md:rounded-none ${windowSize.width && windowSize.width < 700 ? "p[0.5rem] gap-1" : "gap-3 p-[2rem]"} bg-pallete2 [&>*:hover]:bg-accent1 text-white`}>
					<TabsTrigger value="favorites" className="w-full data-[state=active]:bg-accent2 data-[state=active]:text-white">
						Favorites
					</TabsTrigger>
					{isAdmin ? (
						<TabsTrigger value="filters" className="w-full data-[state=active]:bg-accent2 data-[state=active]:text-white">
							Filters
						</TabsTrigger>
					) : null}
					<TabsTrigger value="brasilboard" className="w-full data-[state=active]:bg-accent2 data-[state=active]:text-white">
						Brasilboard
					</TabsTrigger>
					<TabsTrigger value="levels" className="w-full data-[state=active]:bg-accent2 data-[state=active]:text-white">
						Levels
					</TabsTrigger>
				</TabsList>
				<TabsContent value="favorites" className="mt-0 h-[72vh]">
					<Favorites
						user={user}
						fetchInfo={fetchInfo}
						isAdmin={isAdmin}
						setToastColor={setToastColor}
						setToastDescription={setToastDescription}
						setToastOpen={setToastOpen}
						setToastTitle={setToastTitle}
					/>
				</TabsContent>
				{isAdmin ? (
					<TabsContent value="filters" className="mt-0 h-[72vh]">
						<Filters
							user={user}
							fetchInfo={fetchInfo}
							isAdmin={isAdmin}
							setToastColor={setToastColor}
							setToastDescription={setToastDescription}
							setToastOpen={setToastOpen}
							setToastTitle={setToastTitle}
						/>
					</TabsContent>
				) : null}
				<TabsContent value="brasilboard" className="mt-0 h-[72vh]">
					<Brasil
						user={user}
						fetchInfo={fetchInfo}
						isAdmin={isAdmin}
						setToastColor={setToastColor}
						setToastDescription={setToastDescription}
						setToastOpen={setToastOpen}
						setToastTitle={setToastTitle}
					/>
				</TabsContent>
				<TabsContent value="levels" className="mt-0 h-[72vh]">
					<Levels
						user={user}
						fetchInfo={fetchInfo}
						isAdmin={isAdmin}
						setToastColor={setToastColor}
						setToastDescription={setToastDescription}
						setToastOpen={setToastOpen}
						setToastTitle={setToastTitle}
					/>
				</TabsContent>
			</Tabs>
		</section>
	);
};

export default UserSection;
