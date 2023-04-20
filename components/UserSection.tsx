import { supabase } from "@/utils/supabaseUtils";
import Brasil from "./Brasil";
import Favorites from "./Favorites";
import Filters from "./Filters";
import Levels from "./levels";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useRouter } from "next/router";
import { User } from "lucide-react";

const UserSection: React.FC<defaultProps> = ({ user, fetchInfo, isAdmin, setToastDescription, setToastOpen, setToastTitle, setToastColor }) => {
	const router = useRouter();

	async function handleSignOut() {
		const { error } = await supabase.auth.signOut();
		if (error) return;
		router.push("/auth");
	}

	return (
		<section className="flex flex-col flex-grow w-[90%] mx-auto mt-[1rem] shadow h-[97.2%] bg-pallete2 rounded-lg text-white">
			<div className="flex flex-row justify-between w-full bg-pallete3 rounded-t-lg">
				<div className="flex gap-3 w-full h-[10rem] items-center p-[2rem]">
					<Avatar className="w-[5rem] h-[5rem] rounded-full">
						<AvatarImage src={user.user_metadata.avatar_url} />
						<AvatarFallback>
							<User />
						</AvatarFallback>
					</Avatar>
					<div className="text-xl text-white">{user.user_metadata.full_name}</div>
					{isAdmin ? <Badge className="bg-accent1 hover:bg-accent2 text-slate-800">admin</Badge> : null}
				</div>
				<div className="grid place-items-center w-[30%] mr-5">
					<Button className="bg-red-500 hover:bg-red-500 rounded-full hover:scale-105 active:scale-95 px-10 py-5" onClick={handleSignOut}>
						Logout
					</Button>
				</div>
			</div>
			<Tabs defaultValue="brasilboard">
				<TabsList className="w-full gap-3 md:rounded-none p-[2rem] bg-pallete2 [&>*:hover]:bg-accent1 text-white">
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
						<Filters />
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
