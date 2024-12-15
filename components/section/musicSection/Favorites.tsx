import React from "react"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { PlayIcon, Plus, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import useFavorites from "@/hooks/useFavorites"
import Spinner from "@/components/ui/Spinner"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createYTLinkFromId, createYTPlaylistLinkFromId } from "@/functions/createYTLinkFromId"
import ScrollDiv from "@/components/ui/ScrollDiv"
import { defaultProps } from "@/types"
import useFavoritesHandler from "@/hooks/handlers/useFavoritesHandlers"
import { User } from "@supabase/supabase-js"

const Favorites: React.FC<defaultProps> = props => {
	const { user } = props
	const { data: favorites, isLoading, error } = useFavorites("user")
	const { favField, setFavField, addFav, isAdding, deleteFav, isDeleting, playFav, isPlaying } = useFavoritesHandler(props)

	if (isLoading)
		return (
			<div className="h-[calc(100dvh-2rem-10rem-17.8rem)]">
				<Spinner size={150} />
			</div>
		)
	if (error) return <div>Error: {error.message}</div>
	if (!favorites)
		return (
			<div className="grid grid-rows-[4rem_1fr]">
				<SearchBar isAdding={isAdding} favField={favField} addFav={addFav} setFavField={setFavField} />
			</div>
		)

	return (
		<div className="grid grid-rows-[4rem_1fr]">
			<SearchBar isAdding={isAdding} favField={favField} addFav={addFav} setFavField={setFavField} />
			<Tabs defaultValue="video" className="grid grid-rows-[2rem_1fr]">
				<TabsList className="gap-2 bg-background-medium text-dark [&>*:hover]:bg-accent-light [&>button]:w-[80%]">
					<TabsTrigger value="video" className="data-[state=active]:bg-accent-dark data-[state=active]:text-dark">
						Videos
					</TabsTrigger>
					<TabsTrigger value="playlist" className=" data-[state=active]:bg-accent-dark data-[state=active]:text-dark">
						Playlists
					</TabsTrigger>
				</TabsList>
				<TabsContent value="video" className="scrollbar-track-transperent scrollbar-thin scrollbar-thumb-accent-dark">
					<FavoriteList
						type="song"
						favorites={favorites.filter(vid => vid.type === "video")}
						deleteFav={deleteFav}
						user={user}
						isDeleting={isDeleting}
						playFav={playFav}
						isPlaying={isPlaying}
					/>
				</TabsContent>
				<TabsContent value="playlist">
					<FavoriteList
						type="playlist"
						favorites={favorites.filter(vid => vid.type === "playlist")}
						deleteFav={deleteFav}
						user={user}
						isDeleting={isDeleting}
						playFav={playFav}
						isPlaying={isPlaying}
					/>
				</TabsContent>
			</Tabs>
		</div>
	)
}

const SearchBar = ({
	isAdding,
	favField,
	addFav,
	setFavField
}: {
	isAdding: boolean
	favField: string
	addFav: () => void
	setFavField: React.Dispatch<React.SetStateAction<string>>
}) => {
	return (
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
					<Button className="rounded-full bg-accent-dark hover:scale-105 hover:bg-accent-light active:scale-95" onClick={addFav}>
						{isAdding ? <Spinner size={20} /> : <Plus />}
					</Button>
				</HoverCardTrigger>
				<HoverCardContent className="w-auto bg-background-medium p-2 text-dark">Add song or playlist to favorites</HoverCardContent>
			</HoverCard>
		</div>
	)
}

const FavoriteList = ({
	type,
	favorites,
	user,
	isDeleting,
	isPlaying,
	deleteFav,
	playFav
}: {
	type: "playlist" | "song"
	isPlaying: Map<string, boolean>
	isDeleting: Map<string, boolean>
	favorites: fav[]
	user: User
	playFav: (fav: fav) => Promise<void>
	deleteFav: (id: string) => Promise<void>
}) => {
	return (
		<ScrollDiv className="h-[calc(100dvh-2rem-10rem-21.8rem)] overflow-auto rounded-b-lg" id="favorites">
			{favorites
				.sort((a, b) => (new Date(b.date_added).getTime() < new Date(a.date_added).getTime() ? 1 : -1))
				.map((song, index) => {
					return (
						<div className="flex gap-1 p-3" key={index}>
							<div className="w-[5rem] sm:w-[7rem]">
								<Image
									className="h-full w-full select-none object-cover"
									src={song.thumbnail}
									width={1920}
									height={1080}
									alt="thumbnail"
									draggable={false}
								/>
							</div>
							<div className="flex w-[100%] flex-col justify-center">
								<a
									href={type === "playlist" ? createYTPlaylistLinkFromId(song.id) : createYTLinkFromId(song.id)}
									className="xl:text-md text-sm font-semibold text-blue-400 hover:text-blue-600"
								>
									{song.name}
								</a>
							</div>
							<Separator className="h-auto" decorative orientation={"vertical"} />
							<Buttons
								type={type}
								song={song}
								deleteFav={deleteFav}
								user={user}
								isDeleting={isDeleting}
								playFav={playFav}
								isPlaying={isPlaying}
							/>
						</div>
					)
				})}
		</ScrollDiv>
	)
}

const Buttons = ({
	type,
	song,
	user,
	isDeleting,
	isPlaying,
	playFav,
	deleteFav
}: {
	type: "playlist" | "song"
	song: fav
	isPlaying: Map<string, boolean>
	isDeleting: Map<string, boolean>
	user: User
	playFav: (fav: fav) => Promise<void>
	deleteFav: (id: string) => Promise<void>
}) => {
	return (
		<div className="flex flex-row items-center gap-2 px-3">
			<HoverCard openDelay={150} closeDelay={50}>
				<HoverCardTrigger>
					<Button
						className="scale-[85%] rounded-full bg-red-500 hover:scale-105 hover:bg-red-500 active:scale-95 md:scale-100"
						onClick={() => deleteFav(song.id)}
					>
						{isDeleting.get(song.id) ? <Spinner size={20} /> : <X />}
					</Button>
				</HoverCardTrigger>
				<HoverCardContent className="w-auto bg-background-medium p-2 text-dark">Remove from favorites</HoverCardContent>
			</HoverCard>
			<HoverCard openDelay={150} closeDelay={50}>
				<HoverCardTrigger>
					<Button
						className="scale-[85%] rounded-full bg-accent-dark hover:scale-105 hover:bg-accent-light active:scale-95 md:scale-100"
						onClick={() => playFav(song)}
					>
						{isPlaying.get(song.id) ? <Spinner size={20} /> : <PlayIcon />}
					</Button>
				</HoverCardTrigger>
				<HoverCardContent className="w-auto bg-background-medium p-2 text-dark">{`Add ${type} to queue`}</HoverCardContent>
			</HoverCard>
		</div>
	)
}

export default Favorites
