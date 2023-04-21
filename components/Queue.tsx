import React, { useEffect, useRef, useState } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ChevronLastIcon, ListStart, Plus, ShuffleIcon, X } from "lucide-react";
import Image from "next/image";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { supabase } from "@/utils/supabaseUtils";
import axios, { AxiosError } from "axios";
import Spinner from "./ui/Spinner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import useWindowSize from "@/hooks/useWindowSize";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

interface QueueProps extends defaultProps {
	sectionRef: React.RefObject<HTMLDivElement>;
}

const Queue: React.FC<QueueProps> = ({ fetchInfo, isAdmin, setToastColor, setToastDescription, setToastOpen, setToastTitle, sectionRef }) => {
	const [searchInput, setSearchInput] = useState<string>("");
	const [isAdding, setIsAdding] = useState<boolean>(false);
	const [isAddingFirst, setIsAddingFirst] = useState<boolean>(false);
	const [isShuffling, setIsShuffling] = useState<boolean>(false);
	const [isClearing, setIsClearing] = useState<boolean>(false);
	const windowSize = useWindowSize();
	const inputRef = useRef<HTMLInputElement>(null);

	const queue = fetchInfo.queue[0]?.tracks || [];

	function handleAdd() {
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
				.then(() => {
					setIsAdding(false);
					setSearchInput("");
				})
				.catch((err: AxiosError) => {
					const data = err.response?.data as { error: string };
					setToastOpen(true);
					setToastTitle(`${err.response?.status} - ${err.response?.statusText}`);
					setToastDescription(data.error);
					setToastColor("destructive");
					setIsAdding(false);
					setSearchInput("");
				});
		}

		if (isAdding) return;
		setIsAdding(true);
		if (searchInput === "") {
			setToastOpen(true);
			setToastTitle(``);
			setToastDescription("Please enter a song name or url");
			setToastColor("inform");
			return setIsAdding(false);
		}
		addSong();
	}

	function handleAddFirst() {
		async function AddFirst() {
			await axios
				.post(
					"/api/playfirst",
					{
						songs: searchInput,
						access_token: (await supabase.auth.getSession()).data?.session?.access_token,
					},
					{
						headers: { "Content-Type": "application/json" },
					}
				)
				.then(() => {
					setSearchInput("");
					setIsAddingFirst(false);
				})
				.catch((err: AxiosError) => {
					const data = err.response?.data as string;
					setToastOpen(true);
					setToastTitle(`${err.response?.status} - ${err.response?.statusText}`);
					setToastDescription(data);
					setToastColor("destructive");
					setSearchInput("");
					setIsAddingFirst(false);
				});
		}

		if (isAddingFirst) return;
		if (searchInput === "") {
			setToastOpen(true);
			setToastTitle(``);
			setToastDescription("Please enter a song name or url");
			setToastColor("inform");
			return setIsAddingFirst(false);
		}
		setIsAddingFirst(true);
		AddFirst();
	}

	function handleShuffle() {
		async function shuffleSongs() {
			const url = "/api/shuffle";
			await axios
				.post(url, {
					access_token: (await supabase.auth.getSession()).data?.session?.access_token,
				})
				.then(() => {
					setIsShuffling(false);
				})
				.catch((err: AxiosError) => {
					const data = err.response?.data as { error: string };
					setToastOpen(true);
					setToastTitle(`${err.response?.status} - ${err.response?.statusText}`);
					setToastDescription(data.error);
					setToastColor("destructive");
					setIsShuffling(false);
				});
		}

		if (isShuffling) return;
		setIsShuffling(true);
		if (!queue || queue.length < 3) {
			setToastOpen(true);
			setToastTitle(``);
			setToastDescription("No songs to shuffle");
			setToastColor("inform");
			return setIsShuffling(false);
		}
		setIsShuffling(true);
		shuffleSongs();
	}

	function handleClear() {
		async function clearSongs() {
			const url = "/api/clearqueue";
			await axios
				.post(url, {
					access_token: (await supabase.auth.getSession()).data?.session?.access_token,
				})
				.then(() => {
					setIsClearing(false);
				})
				.catch((err) => {
					const data = err.response?.data as { error: string };
					setToastOpen(true);
					setToastTitle(`${err.response?.status} - ${err.response?.statusText}`);
					setToastDescription(data.error);
					setToastColor("destructive");
					setIsClearing(false);
				});
		}

		if (isClearing) return;
		setIsClearing(true);
		if (!isAdmin) {
			setToastOpen(true);
			setToastTitle(``);
			setToastDescription("You are not an admin");
			setToastColor("inform");
			return setIsClearing(false);
		}

		if (!queue || queue.length < 2) {
			setToastOpen(true);
			setToastTitle(``);
			setToastDescription("No songs to clear");
			setToastColor("inform");
			return setIsClearing(false);
		}
		clearSongs();
	}

	function handleRemove(id: number) {
		async function remove() {
			const url = "/api/remove";
			await axios
				.post(
					url,
					{
						queuePos: id,
						access_token: (await supabase.auth.getSession()).data?.session?.access_token,
					},
					{
						headers: { "Content-Type": "application/json" },
					}
				)
				.catch((err: AxiosError) => {
					const data = err.response?.data as { error: string };
					setToastOpen(true);
					setToastTitle(`${err.response?.status} - ${err.response?.statusText}`);
					setToastDescription(data.error);
					setToastColor("destructive");
				});
		}

		if (!isAdmin) {
			setToastOpen(true);
			setToastTitle(``);
			setToastDescription("You are not an admin");
			setToastColor("inform");
			return;
		}

		if (!queue || queue.length === 0) {
			setToastOpen(true);
			setToastTitle(``);
			setToastDescription("No songs to remove");
			setToastColor("inform");
			return;
		}
		remove();
	}

	function handleskipto(id: number) {
		async function skipto() {
			await axios
				.post(
					"/api/skipto",
					{
						queuePos: id,
						access_token: (await supabase.auth.getSession()).data?.session?.access_token,
					},
					{
						headers: { "Content-Type": "application/json" },
					}
				)
				.catch((err: AxiosError) => {
					const data = err.response?.data as { error: string };
					setToastOpen(true);
					setToastTitle(`${err.response?.status} - ${err.response?.statusText}`);
					setToastDescription(data.error);
					setToastColor("destructive");
				});
		}

		if (!isAdmin) {
			setToastOpen(true);
			setToastTitle(``);
			setToastDescription("You are not an admin");
			setToastColor("inform");
			return;
		}

		if (!queue || queue.length === 0) {
			setToastOpen(true);
			setToastTitle(``);
			setToastDescription("No songs to skip to");
			setToastColor("inform");
			return;
		}
		skipto();
	}

	return (
		<section
			className={`${windowSize.width && windowSize.width < 1200 ? "w-[90%]" : ""} mx-auto shadow bg-pallete2 rounded-lg text-white flex-shrink-2`}
			style={{
				height: `${sectionRef?.current?.clientHeight ? Math.round(sectionRef?.current?.clientHeight * 0.575) : 0}px`,
			}}
		>
			<div className={`flex ${windowSize.width && windowSize.width < 600 ? "flex-col" : ""} h-[10%] m-[1rem] gap-2 p-2`} ref={inputRef}>
				<Input
					className="rounded-full"
					placeholder="Search for a song"
					value={searchInput}
					onChange={(e) => {
						setSearchInput(e.target.value);
					}}
					onKeyUp={(e) => {
						if (e.code === "Enter") handleAdd();
					}}
				/>
				<div className="flex flex-row gap-2">
					<HoverCard openDelay={150} closeDelay={50}>
						<HoverCardTrigger>
							<Button className="bg-accent2 hover:bg-accent1 rounded-full hover:scale-105 active:scale-95" onClick={handleAdd}>
								{isAdding ? <Spinner size={20} /> : <Plus />}
							</Button>
						</HoverCardTrigger>
						<HoverCardContent className="bg-pallete2 text-white p-2 w-auto">Add song</HoverCardContent>
					</HoverCard>
					<HoverCard openDelay={150} closeDelay={50}>
						<HoverCardTrigger>
							<Button className="bg-accent2 hover:bg-accent1 rounded-full hover:scale-105 active:scale-95" onClick={handleAddFirst}>
								{isAddingFirst ? <Spinner size={20} /> : <ListStart />}
							</Button>
						</HoverCardTrigger>
						<HoverCardContent className="bg-pallete2 text-white p-2 w-auto">Add song at the top of the queue</HoverCardContent>
					</HoverCard>

					<HoverCard openDelay={150} closeDelay={50}>
						<HoverCardTrigger>
							<Button className="bg-accent2 hover:bg-accent1 rounded-full hover:scale-105 active:scale-95" onClick={handleShuffle}>
								{isShuffling ? <Spinner size={20} /> : <ShuffleIcon />}
							</Button>
						</HoverCardTrigger>
						<HoverCardContent className="bg-pallete2 text-white p-2 w-auto">Shuffle the queue</HoverCardContent>
					</HoverCard>

					{isAdmin ? (
						<HoverCard openDelay={150} closeDelay={50}>
							<HoverCardTrigger>
								<Button className="bg-red-500 hover:bg-red-500 rounded-full hover:scale-105 active:scale-95" onClick={handleClear}>
									{isClearing ? <Spinner size={20} /> : <X />}
								</Button>
							</HoverCardTrigger>
							<HoverCardContent className="bg-pallete2 text-white p-2 w-auto">Clear queue</HoverCardContent>
						</HoverCard>
					) : null}
				</div>
			</div>
			<ScrollArea className={`flex flex-shrink overflow-auto h-[80%]`} id="queue">
				{queue.slice(1).map((song: track, index) => {
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
								<HoverCard openDelay={150} closeDelay={50}>
									<HoverCardTrigger>
										<Button className="bg-red-500 hover:bg-red-500 rounded-full hover:scale-105 active:scale-95" onClick={() => handleRemove(index + 1)}>
											<X />
										</Button>
									</HoverCardTrigger>
									<HoverCardContent className="bg-pallete2 text-white p-2 w-auto">Remove from queue</HoverCardContent>
								</HoverCard>
								<HoverCard openDelay={150} closeDelay={50}>
									<HoverCardTrigger>
										<Button className="bg-accent2 hover:bg-accent1 rounded-full hover:scale-105 active:scale-95" onClick={(e) => handleskipto(index + 1)}>
											<ChevronLastIcon />
										</Button>
									</HoverCardTrigger>
									<HoverCardContent className="bg-pallete2 text-white p-2 w-auto">Skip to song</HoverCardContent>
								</HoverCard>
							</div>
						</div>
					);
				})}
			</ScrollArea>
		</section>
	);
};

export default Queue;
