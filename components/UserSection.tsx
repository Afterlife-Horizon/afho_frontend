import Brasil from "./Brasil";
import Favorites from "./Favorites";
import Filters from "./Filters";
import Levels from "./levels";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const UserSection = () => {
	return (
		<section className="flex flex-col w-[90%] mx-auto mt-[1rem] shadow h-[98%] bg-pallete2 rounded-lg text-white">
			<div className="flex flex-row justify-between w-full bg-pallete3 rounded-t-lg">
				<div className="flex gap-3 w-full h-[10rem] items-center p-[2rem]">
					<Avatar className="w-[5rem] h-[5rem] rounded-full">
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div className="text-xl text-white">Username</div>
				</div>
				<div className="grid place-items-center w-[30%]">
					<Button className="bg-red-500 rounded-full hover:scale-105 active:scale-95 px-10 py-5">Logout</Button>
				</div>
			</div>
			<Tabs defaultValue="brasilboard">
				<TabsList className="w-full md:rounded-none bg-pallete2 [&>*:hover]:bg-accent1 text-white">
					<TabsTrigger value="favorites" className="data-[state=active]:bg-accent2 data-[state=active]:text-white">
						Favorites
					</TabsTrigger>
					<TabsTrigger value="filters" className="data-[state=active]:bg-accent2 data-[state=active]:text-white">
						Filters
					</TabsTrigger>
					<TabsTrigger value="brasilboard" className="data-[state=active]:bg-accent2 data-[state=active]:text-white">
						Brasilboard
					</TabsTrigger>
					<TabsTrigger value="levels" className="data-[state=active]:bg-accent2 data-[state=active]:text-white">
						Levels
					</TabsTrigger>
				</TabsList>
				<TabsContent value="favorites" className="mt-0">
					<Favorites />
				</TabsContent>
				<TabsContent value="filters" className="mt-0">
					<Filters />
				</TabsContent>
				<TabsContent value="brasilboard" className="mt-0">
					<Brasil />
				</TabsContent>
				<TabsContent value="levels" className="mt-0">
					<Levels />
				</TabsContent>
			</Tabs>
		</section>
	);
};

export default UserSection;
