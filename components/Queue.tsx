import React, { useState } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ChevronLastIcon, Plus, X } from "lucide-react";
import Image from "next/image";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { supabase } from "@/utils/supabaseUtils";
import axios from "axios";

const Queue: React.FC<defaultProps> = ({ fetchInfo }) => {
	const [searchInput, setSearchInput] = useState<string>("");
	const [isAdding, setIsAdding] = useState<boolean>(false);

	function handleSearch() {
		async function addSong() {
			await axios
				.post(
					"/api/play",
					{
						songs: searchInput,
						access_token: (await supabase.auth.getSession()).data?.session?.access_token,
					},
					{
						headers: { "Content-Type": "application/json" },
					}
				)
				.catch((err) => {
					console.error(err);
				})
				.finally(() => {
					setSearchInput("");
					setIsAdding(false);
				});
		}

		if (isAdding) return;
		setIsAdding(true);
		if (searchInput === "") return setIsAdding(false);
		addSong();
	}

	return (
		<section className="w-[85%] mx-auto mt-[1rem] shadow bg-pallete2 rounded-lg text-white">
			<div className="flex flex-row gap-2 p-2">
				<Input
					className="rounded-full"
					onChange={(e) => {
						setSearchInput(e.target.value);
					}}
					onKeyUp={(e) => {
						if (e.code === "Enter") handleSearch();
					}}
				/>
				<Button className="bg-accent2 hover:bg-accent1 rounded-full hover:scale-105 active:scale-95" onClick={handleSearch}>
					<Plus />
				</Button>
				<Button className="bg-red-500 hover:bg-red-500 rounded-full hover:scale-105 active:scale-95">
					<X />
				</Button>
			</div>
			<ScrollArea className="h-[40vh] overflow-auto" id="queue">
				{fetchInfo.queue[0]?.tracks.slice(1).map((song: track, index) => {
					return (
						<div className={`flex gap-2 p-3`} key={index}>
							<div className="w-[7rem]">
								<Image className="w-full h-full object-cover" src={song.thumbnail.url} width={1920} height={1080} alt="thumbnail" />
							</div>
							<div className="flex flex-col justify-center w-[100%]">
								<div className="text-lg font-semibold">{song.title}</div>
								<div className="text-slate-400">Requested by: {song.requester.username}</div>
							</div>
							<Separator className="h-auto" decorative orientation={"vertical"} />
							<div className="flex flex-row gap-2 items-center px-3">
								<Button className="bg-red-500 hover:bg-red-500 rounded-full hover:scale-105 active:scale-95">
									<X />
								</Button>
								<Button className="bg-accent2 hover:bg-accent1 rounded-full hover:scale-105 active:scale-95">
									<ChevronLastIcon />
								</Button>
							</div>
						</div>
					);
				})}
			</ScrollArea>
		</section>
	);
};

export default Queue;
