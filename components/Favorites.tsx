import { useState } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { PlayIcon, Plus, X } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";

const Favorites = () => {
	const [favorites, setFavorites] = useState<any[]>([
		{
			name: "Song Name",
			thumbnail: "https://via.placeholder.com/1920x1080/f7f7f7/000000.jpg",
		},
		{
			name: "Song Name",
			thumbnail: "https://via.placeholder.com/1920x1080/f7f7f7/000000.jpg",
		},
		{
			name: "Song Name",
			thumbnail: "https://via.placeholder.com/1920x1080/f7f7f7/000000.jpg",
		},
		{
			name: "Song Name",
			thumbnail: "https://via.placeholder.com/1920x1080/f7f7f7/000000.jpg",
		},
	]);
	return (
		<>
			<div className="flex flex-row gap-2 p-2">
				<Input
					className="rounded-full"
					onChange={(e) => {}}
					onKeyUp={(e) => {
						if (e.code === "Enter") {
						}
					}}
				/>
				<Button className="bg-accent2 hover:bg-accent1 rounded-full hover:scale-105 active:scale-95" onClick={(e) => {}}>
					<Plus />
				</Button>
			</div>
			<ScrollArea className="max-h-[74vh] overflow-auto" id="favorites">
				{favorites.map((song, index) => {
					return (
						<div className="flex gap-2 p-3" key={index}>
							<div className="w-[7rem]">
								<Image className="w-full h-full object-cover" src={song.thumbnail} width={1920} height={1080} alt="thumbnail" />
							</div>
							<div className="flex flex-col justify-center w-[100%]">
								<div className="text-lg font-semibold">{song.name}</div>
							</div>
							<Separator className="h-auto" decorative orientation={"vertical"} />
							<div className="flex flex-row gap-2 items-center px-3">
								<Button className="bg-red-500 hover:bg-red-500 rounded-full hover:scale-105 active:scale-95">
									<X />
								</Button>
								<Button className="bg-accent2 hover:bg-accent1 rounded-full hover:scale-105 active:scale-95">
									<PlayIcon />
								</Button>
							</div>
						</div>
					);
				})}
			</ScrollArea>
		</>
	);
};

export default Favorites;
