import React, { useState } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { PlayIcon, Plus, X } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import useFavorites from "@/hooks/useFavorites";
import Spinner from "./ui/Spinner";
import { supabase } from "@/utils/supabaseUtils";
import { queryClient } from "@/pages/_app";
import axios, { AxiosError } from "axios";

const Favorites: React.FC<defaultProps> = ({ user, setToastOpen, setToastColor, setToastDescription, setToastTitle }) => {
	const { data: favorites, isLoading, error } = useFavorites(user?.id);
	const [favField, setFavField] = useState<string>("");
	const [isAdding, setIsAdding] = useState<boolean>(false);

	if (isLoading) return <Spinner size={150} />;
	if (error) return <div>Error: {error.message}</div>;

	async function addFav() {
		if (isAdding) return;

		if (favField === "") {
			setToastOpen(true);
			setToastTitle(``);
			setToastDescription("Please enter a song name or url");
			setToastColor("inform");
			return setIsAdding(false);
		}
		setIsAdding(true);
		await axios
			.post(
				"/api/addFav",
				{
					access_token: (await supabase.auth.getSession()).data?.session?.access_token,
					url: favField,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.catch((err: AxiosError) => {
				const data = err.response?.data as { error: string };
				setToastOpen(true);
				setToastTitle(`${err.response?.status} - ${err.response?.statusText}`);
				setToastDescription(data.error);
				setToastColor("destructive");
			});
		queryClient.invalidateQueries(["favorites", user.user_metadata.provider_id]);
		setFavField("");
		setIsAdding(false);
	}

	async function deleteFav(userId: string, id: string) {
		await axios
			.delete("/api/delFav", {
				data: {
					userId,
					id,
					access_token: (await supabase.auth.getSession()).data?.session?.access_token,
				},
				headers: {
					"Content-Type": "application/json",
				},
			})
			.catch((err: AxiosError) => {
				const data = err.response?.data as { error: string };
				setToastOpen(true);
				setToastTitle(`${err.response?.status} - ${err.response?.statusText}`);
				setToastDescription(data.error);
				setToastColor("destructive");
			});
		queryClient.invalidateQueries(["favorites", user.user_metadata.provider_id]);
	}

	async function playFav(fav: fav) {
		await axios
			.post(
				"/api/play",
				{
					songs: fav.url,
					access_token: (await supabase.auth.getSession()).data?.session?.access_token,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
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

	return (
		<>
			<div className="flex flex-row gap-2 p-2">
				<Input
					className="rounded-full"
					placeholder="Add a favorite"
					value={favField}
					onChange={(e) => setFavField(e.target.value)}
					onKeyUp={(e) => {
						if (e.code === "Enter") {
						}
					}}
				/>
				<Button className="bg-accent2 hover:bg-accent1 rounded-full hover:scale-105 active:scale-95" onClick={addFav}>
					{isAdding ? <Spinner size={30} /> : <Plus />}
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
								<Button className="bg-red-500 hover:bg-red-500 rounded-full hover:scale-105 active:scale-95" onClick={() => deleteFav(user.user_metadata.provider_id, song.id)}>
									<X />
								</Button>
								<Button className="bg-accent2 hover:bg-accent1 rounded-full hover:scale-105 active:scale-95" onClick={() => playFav(song)}>
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
