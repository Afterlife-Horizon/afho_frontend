import { ChevronLastIcon, ListStart, Plus, ShuffleIcon, X } from "lucide-react"
import React from "react"
import Image from "next/image"
import Spinner from "../../ui/Spinner"
import { Button } from "../../ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../ui/hover-card"
import { Input } from "../../ui/input"
import { Separator } from "../../ui/separator"
import { createYTLinkFromId } from "@/functions/createYTLinkFromId"
import ScrollDiv from "@/components/ui/ScrollDiv"
import { defaultProps } from "@/types"
import useQueueHandler from "@/hooks/handlers/useQueueHandler"

const Queue: React.FC<defaultProps> = props => {
	const { isAdmin } = props
	const {
		queue,
		isAdding,
		isAddingFirst,
		isShuffling,
		isSkipping,
		isClearing,
		isRemoving,
		searchInput,
		setSearchInput,
		lastRequestRef,
		handleAdd,
		handleAddFirst,
		handleskipto,
		handleShuffle,
		handleRemove,
		handleClear
	} = useQueueHandler(props)

	return (
		<>
			<div className={`flex flex-col gap-2 p-2 sm:flex-row`}>
				<Input
					className="rounded-full"
					placeholder="Search for a song"
					value={searchInput}
					onChange={e => {
						setSearchInput(e.target.value)
					}}
					onKeyUp={e => {
						if (e.code === "Enter") handleAdd()
					}}
				/>
				<GeneralButtons
					isAdmin={isAdmin}
					isAdding={isAdding}
					isAddingFirst={isAddingFirst}
					isShuffling={isShuffling}
					isClearing={isClearing}
					handleClear={handleClear}
					handleAddFirst={handleAddFirst}
					handleShuffle={handleShuffle}
					handleAdd={handleAdd}
				/>
			</div>
			<ScrollDiv className="h-[calc(100dvh-31rem)]">
				{queue.map((song, index) => {
					return (
						<div ref={index + 1 === queue.length ? lastRequestRef : undefined} className={`flex gap-2 p-3`} key={index}>
							<div className="w-[5rem] sm:w-[7rem]">
								<Image
									className="h-full w-full select-none object-cover"
									src={song.thumbnail.url}
									width={1920}
									height={1080}
									alt="thumbnail"
									draggable={false}
								/>
							</div>
							<div className="xl:text-md flex w-[100%] flex-col justify-center text-sm">
								<a href={createYTLinkFromId(song.id)} className="font-semibold text-blue-400 hover:text-blue-600">
									{song.title}
								</a>
								<div className="text-slate-400">Requested by: {song.requester.username}</div>
							</div>
							<Separator className="h-auto" decorative orientation={"vertical"} />
							<SpecificButtons
								index={index}
								isRemoving={isRemoving}
								isSkipping={isSkipping}
								handleRemove={handleRemove}
								handleskipto={handleskipto}
							/>
						</div>
					)
				})}
			</ScrollDiv>
		</>
	)
}

const GeneralButtons = ({
	isAdding,
	isAddingFirst,
	isShuffling,
	isAdmin,
	isClearing,
	handleAdd,
	handleAddFirst,
	handleShuffle,
	handleClear
}: {
	isAdding: boolean
	isAddingFirst: boolean
	isShuffling: boolean
	isAdmin: boolean
	isClearing: boolean
	handleAdd: () => void
	handleAddFirst: () => void
	handleShuffle: () => void
	handleClear: () => void
}) => {
	return (
		<div className="flex flex-row gap-2">
			<HoverCard openDelay={150} closeDelay={50}>
				<HoverCardTrigger>
					<Button className="rounded-full bg-accent-dark hover:scale-105 hover:bg-accent-light active:scale-95" onClick={handleAdd}>
						{isAdding ? <Spinner size={20} /> : <Plus />}
					</Button>
				</HoverCardTrigger>
				<HoverCardContent className="w-auto bg-background-medium p-2 text-dark">Add song</HoverCardContent>
			</HoverCard>
			<HoverCard openDelay={150} closeDelay={50}>
				<HoverCardTrigger>
					<Button className="rounded-full bg-accent-dark hover:scale-105 hover:bg-accent-light active:scale-95" onClick={handleAddFirst}>
						{isAddingFirst ? <Spinner size={20} /> : <ListStart />}
					</Button>
				</HoverCardTrigger>
				<HoverCardContent className="w-auto bg-background-medium p-2 text-dark">Add song at the top of the queue</HoverCardContent>
			</HoverCard>
			<HoverCard openDelay={150} closeDelay={50}>
				<HoverCardTrigger>
					<Button className="rounded-full bg-accent-dark hover:scale-105 hover:bg-accent-light active:scale-95" onClick={handleShuffle}>
						{isShuffling ? <Spinner size={20} /> : <ShuffleIcon />}
					</Button>
				</HoverCardTrigger>
				<HoverCardContent className="w-auto bg-background-medium p-2 text-dark">Shuffle the queue</HoverCardContent>
			</HoverCard>
			{isAdmin ? (
				<HoverCard openDelay={150} closeDelay={50}>
					<HoverCardTrigger>
						<Button className="rounded-full bg-red-500 hover:scale-105 hover:bg-red-500 active:scale-95" onClick={handleClear}>
							{isClearing ? <Spinner size={20} /> : <X />}
						</Button>
					</HoverCardTrigger>
					<HoverCardContent className="w-auto bg-background-medium p-2 text-dark">Clear queue</HoverCardContent>
				</HoverCard>
			) : null}
		</div>
	)
}

const SpecificButtons = ({
	index,
	isRemoving,
	isSkipping,
	handleRemove,
	handleskipto
}: {
	index: number
	isRemoving: Map<number, boolean>
	isSkipping: Map<number, boolean>
	handleRemove: (id: number) => void
	handleskipto: (id: number) => void
}) => {
	return (
		<div className="flex flex-row items-center gap-2 px-3">
			<HoverCard openDelay={150} closeDelay={50}>
				<HoverCardTrigger>
					<Button
						className="scale-[85%] rounded-full bg-red-500 hover:scale-105 hover:bg-red-500 active:scale-95 md:scale-100"
						onClick={() => handleRemove(index + 1)}
					>
						{isRemoving.get(index + 1) ? <Spinner size={20} /> : <X />}
					</Button>
				</HoverCardTrigger>
				<HoverCardContent className="w-auto bg-background-medium p-2 text-dark">Remove from queue</HoverCardContent>
			</HoverCard>
			<HoverCard openDelay={150} closeDelay={50}>
				<HoverCardTrigger>
					<Button
						className="scale-[85%] rounded-full bg-accent-dark hover:scale-105 hover:bg-accent-light active:scale-95 md:scale-100"
						onClick={_ => handleskipto(index + 1)}
					>
						{isSkipping.get(index + 1) ? <Spinner size={20} /> : <ChevronLastIcon />}
					</Button>
				</HoverCardTrigger>
				<HoverCardContent className="w-auto bg-background-medium p-2 text-dark">Skip to song</HoverCardContent>
			</HoverCard>
		</div>
	)
}

export default Queue
