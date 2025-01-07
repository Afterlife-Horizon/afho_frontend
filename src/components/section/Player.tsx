import { Button } from "../ui/button"
import React, { useEffect, useState } from "react"
import { Progress } from "../ui/progress"
import { Pause, Play, PowerOffIcon, SkipForwardIcon, X } from "lucide-react"
import Spinner from "../ui/Spinner"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { createYTLinkFromId } from "functions/createYTLinkFromId"
import ytThumbnailLink from "functions/ytThumbnailLink"
import { defaultProps } from "types"
import usePlayerHandler from "hooks/handlers/usePlayerHandler"

const Player: React.FC<defaultProps> = props => {
	const { fetchInfo, isAdmin } = props
	const [playerInfoClasses, setPlayerInfoClasses] = useState<string>("hidden row-start-1 col-start-1 h-auto p-[1.5rem]")
	const [usingFallback, setUsingFallback] = useState(false)
	const {
		isPausing,
		isSkipping,
		isLeaving,
		isStopping,
		queue,
		currentSongId,
		handleNextClicked,
		handlePauseClicked,
		handleStopClicked,
		handleDisconnectClicked
	} = usePlayerHandler(props)

	useEffect(() => {
		setUsingFallback(false)
	}, [currentSongId])

	function handleMouseEnter() {
		setPlayerInfoClasses(prev => prev.replace("hidden", "grid"))
	}

	function handleMouseLeave() {
		setPlayerInfoClasses(prev => prev.replace("grid", "hidden"))
	}

	return (
		<section
			className={`mx-auto grid h-[100%] w-full rounded-lg bg-background-medium shadow hover:scale-[1.02] xl:w-auto [&:hover>img]:blur-[5px] [&:hover>img]:brightness-[0.5]`}
			onMouseEnter={() => handleMouseEnter()}
			onMouseLeave={() => handleMouseLeave()}
		>
			<img
				className="col-start-1 row-start-1 h-[100%] select-none overflow-hidden rounded-lg object-cover pointer-events-none"
				src={usingFallback ? queue[0]?.thumbnail : ytThumbnailLink(queue[0]?.id, "maxresdefault")}
				onError={() => setUsingFallback(true)}
				width={1920}
				height={1080}
			/>
			<div className={playerInfoClasses} style={{ zIndex: 1 }}>
				<div className="text-dark">
					<a className="text-blue-400 hover:text-blue-600" href={createYTLinkFromId(queue[0]?.id)}>
						{queue[0] ? `${queue[0]?.author} - ${queue[0]?.title}` : ""}
					</a>
					<div className="invert-0">{queue[0] ? `Requested by: ${queue[0]?.requester ? queue[0]?.requester : "None"}` : ""}</div>
				</div>
				<div className="self-end">
					<div className="flex select-none gap-2">
						<AdminButtons
							isAdmin={isAdmin}
							isLeaving={isLeaving}
							isStopping={isStopping}
							handleDisconnectClicked={handleDisconnectClicked}
							handleStopClicked={handleStopClicked}
						/>
						<UserButtons
							isPaused={fetchInfo.queue[0]?.paused}
							isPausing={isPausing}
							isSkipping={isSkipping}
							handlePauseClicked={handlePauseClicked}
							handleNextClicked={handleNextClicked}
						/>
					</div>
					<Progress className="mt-2 h-[0.2rem]" value={queue[0] ? Math.floor(100 * (fetchInfo.prog / queue[0].duration)) : 0} />
					<div className="text-dark">{queue[0] ? `${fetchInfo.formatedprog} / ${queue[0].durationFormatted}` : "00:00 / 00:00"}</div>
				</div>
			</div>
		</section>
	)
}

const AdminButtons = ({
	isAdmin,
	isLeaving,
	isStopping,
	handleDisconnectClicked,
	handleStopClicked
}: {
	isAdmin: boolean
	isLeaving: boolean
	isStopping: boolean
	handleDisconnectClicked: (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>
	handleStopClicked: (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>
}) => {
	if (!isAdmin) return null
	return (
		<>
			<HoverCard openDelay={150} closeDelay={50}>
				<HoverCardTrigger>
					<Button
						className="rounded-full bg-accent-dark hover:scale-105 hover:bg-accent-light active:scale-95"
						onClick={handleDisconnectClicked}
					>
						{isLeaving ? <Spinner size={20} /> : <PowerOffIcon />}
					</Button>
				</HoverCardTrigger>
				<HoverCardContent className="w-auto bg-background-medium p-2 text-dark">Disconnect</HoverCardContent>
			</HoverCard>
			<HoverCard openDelay={150} closeDelay={50}>
				<HoverCardTrigger>
					<Button
						className="rounded-full bg-accent-dark hover:scale-105  hover:bg-accent-light active:scale-95"
						onClick={handleStopClicked}
					>
						{isStopping ? <Spinner size={20} /> : <X />}
					</Button>
				</HoverCardTrigger>
				<HoverCardContent className="w-auto bg-background-medium p-2 text-dark">Stop and clear queue</HoverCardContent>
			</HoverCard>
		</>
	)
}

const UserButtons = ({
	isPaused,
	isSkipping,
	isPausing,
	handlePauseClicked,
	handleNextClicked
}: {
	isPaused: boolean
	isPausing: boolean
	isSkipping: boolean
	handlePauseClicked: (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>
	handleNextClicked: (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>
}) => {
	return (
		<>
			<HoverCard openDelay={150} closeDelay={50}>
				<HoverCardTrigger>
					<Button
						className="rounded-full bg-accent-dark hover:scale-105  hover:bg-accent-light active:scale-95"
						onClick={handlePauseClicked}
					>
						{isPausing ? <Spinner size={20} /> : isPaused ? <Play /> : <Pause />}
					</Button>
				</HoverCardTrigger>
				<HoverCardContent className="w-auto bg-background-medium p-2 text-dark">{isPausing ? "Play" : "Pause"}</HoverCardContent>
			</HoverCard>
			<HoverCard openDelay={150} closeDelay={50}>
				<HoverCardTrigger>
					<Button
						className="rounded-full bg-accent-dark hover:scale-105  hover:bg-accent-light active:scale-95"
						onClick={handleNextClicked}
					>
						{isSkipping ? <Spinner size={20} /> : <SkipForwardIcon />}
					</Button>
				</HoverCardTrigger>
				<HoverCardContent className="w-auto bg-background-medium p-2 text-dark">Skip current song</HoverCardContent>
			</HoverCard>
		</>
	)
}

export default Player
