import React, { useState } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ChevronLastIcon, X } from "lucide-react";
import Image from "next/image";
import { Input } from "./ui/input";
import InfiniteScroll from "react-infinite-scroll-component";
import { ScrollArea } from "./ui/scroll-area";

const Queue = () => {
	const [queue, setQueue] = useState<any[]>([
		{
			name: "Song Name",
			thumbnail: "https://via.placeholder.com/1920x1080/f7f7f7/000000.jpg",
			requestedBy: "-----",
		},
		{
			name: "Song Name",
			thumbnail: "https://via.placeholder.com/1920x1080/f7f7f7/000000.jpg",
			requestedBy: "-----",
		},
		{
			name: "Song Name",
			thumbnail: "https://via.placeholder.com/1920x1080/f7f7f7/000000.jpg",
			requestedBy: "-----",
		},
		{
			name: "Song Name",
			thumbnail: "https://via.placeholder.com/1920x1080/f7f7f7/000000.jpg",
			requestedBy: "-----",
		},
		{
			name: "Song Name",
			thumbnail: "https://via.placeholder.com/1920x1080/f7f7f7/000000.jpg",
			requestedBy: "-----",
		},
		{
			name: "Song Name",
			thumbnail: "https://via.placeholder.com/1920x1080/f7f7f7/000000.jpg",
			requestedBy: "-----",
		},
	]);

	const [searchInput, setSearchInput] = useState<string>("");

	function handleSearch() {
		console.log(searchInput);
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
				<Button className="bg-accent2 rounded-full hover:scale-105 active:scale-95" onClick={handleSearch}>
					Request
				</Button>
			</div>
			<ScrollArea className="h-[40vh] overflow-auto" id="queue">
				{queue.map((song, index) => {
					return (
						<div className={`flex gap-2 p-3`} key={index}>
							<div className="w-[7rem]">
								<Image className="w-full h-full object-cover" src={song.thumbnail} width={1920} height={1080} alt="thumbnail" />
							</div>
							<div className="flex flex-col justify-center w-[100%]">
								<div className="text-lg font-semibold">{song.name}</div>
								<div className="text-slate-400">Requested by: {song.requestedBy}</div>
							</div>
							<Separator className="h-auto" decorative orientation={"vertical"} />
							<div className="flex flex-row gap-2 items-center px-3">
								<Button className="bg-red-500 rounded-full hover:scale-105 active:scale-95">
									<X />
								</Button>
								<Button className="bg-accent2 rounded-full hover:scale-105 active:scale-95">
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
