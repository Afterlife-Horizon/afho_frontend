import React, { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { PlayIcon, Plus, X } from "lucide-react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import useFavorites from "@/hooks/useFavorites"
import Spinner from "@/components/ui/Spinner"
import { supabase } from "@/utils/supabaseUtils"
import { queryClient } from "@/pages/_app"
import axios, { AxiosError } from "axios"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Favorites: React.FC<defaultProps> = ({ user, setToastOpen, setToastColor, setToastDescription, setToastTitle }) => {
	const { data: favorites, isLoading, error } = useFavorites("user")
	const [favField, setFavField] = useState<string>("")
	const [isAdding, setIsAdding] = useState<boolean>(false)
	const [isDeleting, setIsDeleting] = useState<Map<string, boolean>>(new Map())
	const [isPlaying, setIsPlaying] = useState<Map<string, boolean>>(new Map())

	if (isLoading)
		return (
			<div className="h-[calc(100vh-2rem-10rem-4rem)]">
				<Spinner size={150} />
			</div>
		)
	if (error) return <div>Error: {error.message}</div>

	async function addFav() {
		if (isAdding) return

		if (favField === "") {
			setToastOpen(true)
			setToastTitle(``)
			setToastDescription("Please enter a song name or url")
			setToastColor("inform")
			return setIsAdding(false)
		}
		setIsAdding(true)
		await axios
			.post(
				"/api/addFav",
				{
					access_token: (await supabase.auth.getSession()).data?.session?.access_token,
					url: favField
				},
				{
					headers: {
						"Content-Type": "application/json"
					}
				}
			)
			.then(res => {
				queryClient.invalidateQueries(["favorites", "user"])
				setFavField("")
				setIsAdding(false)
			})
			.catch((err: AxiosError) => {
				const data = err.response?.data as { error: string }
				setToastOpen(true)
				setToastTitle(`${err.response?.status} - ${err.response?.statusText}`)
				setToastDescription(data.error)
				setToastColor("destructive")
				queryClient.invalidateQueries(["favorites", "user"])
				setFavField("")
				setIsAdding(false)
			})
	}

	async function deleteFav(userId: string, id: string) {
		if (isDeleting.get(id)) return
		setIsDeleting(() => {
			const newMap = new Map()
			newMap.set(id, true)
			return newMap
		})

		await axios
			.delete("/api/delFav", {
				data: {
					userId,
					id,
					access_token: (await supabase.auth.getSession()).data?.session?.access_token
				},
				headers: {
					"Content-Type": "application/json"
				}
			})
			.then(() => {
				queryClient.invalidateQueries(["favorites", "user"])
				setIsDeleting(() => {
					const newMap = new Map()
					newMap.set(id, false)
					return newMap
				})
			})
			.catch((err: AxiosError) => {
				const data = err.response?.data as { error: string }
				setToastOpen(true)
				setToastTitle(`${err.response?.status} - ${err.response?.statusText}`)
				setToastDescription(data.error)
				setToastColor("destructive")
				setIsDeleting(() => {
					const newMap = new Map()
					newMap.set(id, false)
					return newMap
				})
				queryClient.invalidateQueries(["favorites", "user"])
			})
	}

	async function playFav(fav: fav) {
		if (isPlaying.get(fav.id)) return
		setIsPlaying(() => {
			const newMap = new Map()
			newMap.set(fav.id, true)
			return newMap
		})

		await axios
			.post(
				"/api/play",
				{
					songs: fav.url,
					access_token: (await supabase.auth.getSession()).data?.session?.access_token
				},
				{
					headers: {
						"Content-Type": "application/json"
					}
				}
			)
			.then(() => {
				setIsPlaying(() => {
					const newMap = new Map()
					newMap.set(fav.id, false)
					return newMap
				})
			})
			.catch((err: AxiosError) => {
				const data = err.response?.data as { error: string }
				setToastOpen(true)
				setToastTitle(`${err.response?.status} - ${err.response?.statusText}`)
				setToastDescription(data.error)
				setToastColor("destructive")
				setIsPlaying(() => {
					const newMap = new Map()
					newMap.set(fav.id, false)
					return newMap
				})
			})
	}

	return (
		<div className="grid grid-rows-[4rem_1fr]">
			<div className="flex flex-row gap-2 p-2">
				<Input
					className="rounded-full"
					placeholder="Add a favorite"
					value={favField}
					onChange={e => setFavField(e.target.value)}
					onKeyUp={e => {
						if (e.code === "Enter") {
							addFav()
						}
					}}
				/>
				<HoverCard openDelay={150} closeDelay={50}>
					<HoverCardTrigger>
						<Button className="bg-accent2 hover:bg-accent1 rounded-full hover:scale-105 active:scale-95" onClick={addFav}>
							{isAdding ? <Spinner size={20} /> : <Plus />}
						</Button>
					</HoverCardTrigger>
					<HoverCardContent className="bg-pallete2 text-white p-2 w-auto">Add song or playlist to favorites</HoverCardContent>
				</HoverCard>
			</div>
			<Tabs defaultValue="video" className="grid grid-rows-[2rem_1fr]">
				<TabsList className="[&>button]:w-[80%] gap-2 bg-pallete2 [&>*:hover]:bg-accent1 text-white">
					<TabsTrigger value="video" className="data-[state=active]:bg-accent2 data-[state=active]:text-white">
						Videos
					</TabsTrigger>
					<TabsTrigger value="playlist" className=" data-[state=active]:bg-accent2 data-[state=active]:text-white">
						Playlists
					</TabsTrigger>
				</TabsList>
				<TabsContent value="video">
					<ScrollArea className="overflow-auto rounded-b-lg h-[calc(100vh-2rem-10rem-11rem)] break-words" id="favorites">
						{favorites
							.filter(vid => vid.type === "video")
							.sort((a, b) => (new Date(a.date_added).getTime() < new Date(b.date_added).getTime() ? 1 : -1))
							.map((song, index) => {
								return (
									<div className="flex gap-1 p-3" key={index}>
										<div className="w-[5rem] sm:w-[7rem]">
											<LazyLoadImage
												className="w-full h-full object-cover select-none"
												src={song.thumbnail}
												width={1920}
												height={1080}
												alt="thumbnail"
												draggable={false}
											/>
										</div>
										<div className="flex flex-col justify-center w-[100%]">
											<div className="text-sm xl:text-md font-semibold">{song.name}</div>
										</div>
										<Separator className="h-auto" decorative orientation={"vertical"} />
										<div className="flex flex-row gap-2 items-center px-3">
											<HoverCard openDelay={150} closeDelay={50}>
												<HoverCardTrigger>
													<Button
														className="bg-red-500 hover:bg-red-500 rounded-full scale-[85%] md:scale-100 hover:scale-105 active:scale-95"
														onClick={() => deleteFav(user.user_metadata.provider_id, song.id)}
													>
														{isDeleting.get(song.id) ? <Spinner size={20} /> : <X />}
													</Button>
												</HoverCardTrigger>
												<HoverCardContent className="bg-pallete2 text-white p-2 w-auto">
													Remove from favorites
												</HoverCardContent>
											</HoverCard>
											<HoverCard openDelay={150} closeDelay={50}>
												<HoverCardTrigger>
													<Button
														className="bg-accent2 hover:bg-accent1 rounded-full scale-[85%] md:scale-100 hover:scale-105 active:scale-95"
														onClick={() => playFav(song)}
													>
														{isPlaying.get(song.id) ? <Spinner size={20} /> : <PlayIcon />}
													</Button>
												</HoverCardTrigger>
												<HoverCardContent className="bg-pallete2 text-white p-2 w-auto">Add song to queue</HoverCardContent>
											</HoverCard>
										</div>
									</div>
								)
							})}
					</ScrollArea>
				</TabsContent>
				<TabsContent value="playlist">
					<ScrollArea className="overflow-auto rounded-b-lg h-[calc(100vh-2rem-10rem-11rem)]" id="favorites">
						{favorites
							.filter(vid => vid.type === "playlist")
							.sort((a, b) => (new Date(b.date_added).getTime() < new Date(a.date_added).getTime() ? 1 : -1))
							.map((song, index) => {
								return (
									<div className="flex gap-1 p-3" key={index}>
										<div className="w-[5rem] sm:w-[7rem]">
											<LazyLoadImage
												className="w-full h-full object-cover select-none"
												src={song.thumbnail}
												width={1920}
												height={1080}
												alt="thumbnail"
												draggable={false}
											/>
										</div>
										<div className="flex flex-col justify-center w-[100%]">
											<div className="text-sm xl:text-md font-semibold">{song.name}</div>
										</div>
										<Separator className="h-auto" decorative orientation={"vertical"} />
										<div className="flex flex-row gap-2 items-center px-3">
											<HoverCard openDelay={150} closeDelay={50}>
												<HoverCardTrigger>
													<Button
														className="bg-red-500 hover:bg-red-500 rounded-full scale-[85%] md:scale-100 hover:scale-105 active:scale-95"
														onClick={() => deleteFav(user.user_metadata.provider_id, song.id)}
													>
														{isDeleting.get(song.id) ? <Spinner size={20} /> : <X />}
													</Button>
												</HoverCardTrigger>
												<HoverCardContent className="bg-pallete2 text-white p-2 w-auto">
													Remove from favorites
												</HoverCardContent>
											</HoverCard>
											<HoverCard openDelay={150} closeDelay={50}>
												<HoverCardTrigger>
													<Button
														className="bg-accent2 hover:bg-accent1 rounded-full scale-[85%] md:scale-100 hover:scale-105 active:scale-95"
														onClick={() => playFav(song)}
													>
														{isPlaying.get(song.id) ? <Spinner size={20} /> : <PlayIcon />}
													</Button>
												</HoverCardTrigger>
												<HoverCardContent className="bg-pallete2 text-white p-2 w-auto">
													Add playlist to queue
												</HoverCardContent>
											</HoverCard>
										</div>
									</div>
								)
							})}
					</ScrollArea>
				</TabsContent>
			</Tabs>
		</div>
	)
}

export default Favorites
