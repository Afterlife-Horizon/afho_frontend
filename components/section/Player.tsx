import Image from "next/image"
import { Button } from "../ui/button"
import React, { useEffect, useMemo, useState } from "react"
import { Progress } from "../ui/progress"
import { Pause, Play, PowerOffIcon, SkipForwardIcon, X } from "lucide-react"
import axios, { AxiosError } from "axios"
import { supabase } from "@/utils/supabaseUtils"
import Spinner from "../ui/Spinner"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import createYTLinkFromId from "@/functions/createYTLinkFromId"
import ytThumbnailLink from "@/functions/ytThumbnailLink"

const Player: React.FC<defaultProps> = ({ user, fetchInfo, isAdmin, setToastColor, setToastDescription, setToastOpen, setToastTitle }) => {
	const [playerInfoClasses, setPlayerInfoClasses] = useState<string>("hidden row-start-1 col-start-1 h-auto p-[1.5rem]")
	const [isPausing, setIsPausing] = useState<boolean>(false)
	const [isSkipping, setIsSkipping] = useState<boolean>(false)
	const [isLeaving, setIsLeaving] = useState<boolean>(false)
	const [isStopping, setIsStopping] = useState<boolean>(false)
	const [usingFallback, setUsingFallback] = useState(false)
	const queue = fetchInfo.queue[0]?.tracks || []
	const id = queue[0].id

	useEffect(() => {
		setUsingFallback(false)
	}, [id])

	function handleMouseEnter() {
		setPlayerInfoClasses(prev => prev.replace("hidden", "grid"))
	}

	function handleMouseLeave() {
		setPlayerInfoClasses(prev => prev.replace("grid", "hidden"))
	}

	async function handleNextClicked(_event: React.MouseEvent<HTMLButtonElement>) {
		setIsSkipping(true)

		if (!queue || queue.length < 2) {
			setIsSkipping(false)
			setToastOpen(true)
			setToastTitle(``)
			setToastDescription("No song to skip to!")
			setToastColor("inform")
			return
		}
		await axios
			.post(
				"/api/skip",
				{
					access_token: (await supabase.auth.getSession()).data?.session?.access_token
				},
				{
					headers: { "Content-Type": "application/json" }
				}
			)
			.then(() => {
				setIsSkipping(false)
			})
			.catch((err: AxiosError) => {
				const data = err.response?.data as { error: string }
				setToastOpen(true)
				setToastTitle(`${err.response?.status} - ${err.response?.statusText}`)
				setToastDescription(data.error)
				setToastColor("destructive")
				setIsSkipping(false)
			})
	}

	async function handlePauseClicked(_event: React.MouseEvent<HTMLButtonElement>) {
		setIsPausing(true)

		if (!queue || queue.length < 1) {
			setIsPausing(false)
			setToastOpen(true)
			setToastTitle(``)
			setToastDescription("No song to pause!")
			setToastColor("inform")
			return
		}

		if (fetchInfo.queue[0].paused) {
			await axios
				.post(
					"/api/unpause",
					{
						access_token: (await supabase.auth.getSession()).data?.session?.access_token
					},
					{
						headers: { "Content-Type": "application/json" }
					}
				)
				.then(() => {
					setIsPausing(false)
				})
				.catch((err: AxiosError) => {
					const data = err.response?.data as { error: string }
					setToastOpen(true)
					setToastTitle(`${err.response?.status} - ${err.response?.statusText}`)
					setToastDescription(data.error)
					setToastColor("destructive")
					setIsPausing(false)
				})
		} else {
			await axios
				.post(
					"/api/pause",
					{
						access_token: (await supabase.auth.getSession()).data?.session?.access_token
					},
					{
						headers: { "Content-Type": "application/json" }
					}
				)
				.then(() => {
					setIsPausing(false)
				})
				.catch((err: AxiosError) => {
					const data = err.response?.data as { error: string }
					setToastOpen(true)
					setToastTitle(`${err.response?.status} - ${err.response?.statusText}`)
					setToastDescription(data.error)
					setToastColor("destructive")
					setIsPausing(false)
				})
		}
	}

	async function handleStopClicked(_event: React.MouseEvent<HTMLButtonElement>) {
		setIsStopping(true)

		if (!isAdmin) {
			setIsStopping(false)
			setToastOpen(true)
			setToastTitle(``)
			setToastDescription("You need to be admin!")
			setToastColor("inform")
			return
		}

		if (!queue || queue.length < 1) {
			setIsStopping(false)
			setToastOpen(true)
			setToastTitle(``)
			setToastDescription("No song to stop!")
			setToastColor("inform")
			return
		}

		await axios
			.post(
				"/api/stop",
				{
					access_token: (await supabase.auth.getSession()).data?.session?.access_token
				},
				{
					headers: { "Content-Type": "application/json" }
				}
			)
			.then(() => {
				setIsStopping(false)
			})
			.catch((err: AxiosError) => {
				const data = err.response?.data as { error: string }
				setToastOpen(true)
				setToastTitle(`${err.response?.status} - ${err.response?.statusText}`)
				setToastDescription(data.error)
				setToastColor("destructive")
				setIsStopping(false)
			})
	}

	async function handleDisconnectClicked(_event: React.MouseEvent<HTMLButtonElement>) {
		if (isLeaving) return
		setIsLeaving(true)

		if (!isAdmin) {
			setIsLeaving(false)
			setToastOpen(true)
			setToastTitle(``)
			setToastDescription("You need to be admin!")
			setToastColor("inform")
			return
		}

		await axios
			.post(
				"/api/disconnect",
				{
					access_token: (await supabase.auth.getSession()).data?.session?.access_token
				},
				{
					headers: { "Content-Type": "application/json" }
				}
			)
			.then(() => {
				setIsLeaving(false)
			})
			.catch((err: AxiosError) => {
				const data = err.response?.data as { error: string }
				setToastOpen(true)
				setToastTitle(`${err.response?.status} - ${err.response?.statusText}`)
				setToastDescription(data.error)
				setToastColor("destructive")
				setIsLeaving(false)
			})
	}
	return (
		<section
			className={`bg-pallete2 rounded-lg grid h-[100%] w-full xl:w-auto mx-auto shadow hover:scale-[1.02] [&:hover>img]:blur-[5px] [&:hover>img]:brightness-[0.5]`}
			onMouseEnter={() => handleMouseEnter()}
			onMouseLeave={() => handleMouseLeave()}
		>
			<Image
				className="row-start-1 rounded-lg col-start-1 select-none h-[100%] overflow-hidden object-cover"
				priority
				src={
					usingFallback ? fetchInfo.queue[0]?.tracks[0]?.thumbnail.url : ytThumbnailLink(fetchInfo.queue[0]?.tracks[0]?.id, "maxresdefault")
				}
				onError={() => setUsingFallback(true)}
				width={1920}
				height={1080}
				alt="thumbnail"
			/>
			<div className={playerInfoClasses} style={{ zIndex: 1 }}>
				<div className="text-white">
					<a
						className="text-blue-400 hover:text-blue-600"
						href={createYTLinkFromId(fetchInfo.queue[0]?.tracks[0]?.id)}
					>{`${fetchInfo.queue[0]?.tracks[0]?.channel.name} - ${fetchInfo.queue[0]?.tracks[0]?.title}`}</a>
					<div className="invert-0">
						Requested by: {fetchInfo.queue[0]?.tracks[0]?.requester.username ? fetchInfo.queue[0]?.tracks[0]?.requester.username : "None"}
					</div>
				</div>
				<div className="self-end">
					<div className="flex gap-2 select-none">
						{isAdmin ? (
							<>
								<HoverCard openDelay={150} closeDelay={50}>
									<HoverCardTrigger>
										<Button
											className="rounded-full bg-accent2 hover:bg-accent1 hover:scale-105 active:scale-95"
											onClick={handleDisconnectClicked}
										>
											{isLeaving ? <Spinner size={20} /> : <PowerOffIcon />}
										</Button>
									</HoverCardTrigger>
									<HoverCardContent className="bg-pallete2 text-white p-2 w-auto">Disconnect</HoverCardContent>
								</HoverCard>
								<HoverCard openDelay={150} closeDelay={50}>
									<HoverCardTrigger>
										<Button
											className="rounded-full bg-accent2 hover:bg-accent1  hover:scale-105 active:scale-95"
											onClick={handleStopClicked}
										>
											{isStopping ? <Spinner size={20} /> : <X />}
										</Button>
									</HoverCardTrigger>
									<HoverCardContent className="bg-pallete2 text-white p-2 w-auto">Stop and clear queue</HoverCardContent>
								</HoverCard>
							</>
						) : null}
						<HoverCard openDelay={150} closeDelay={50}>
							<HoverCardTrigger>
								<Button
									className="rounded-full bg-accent2 hover:bg-accent1  hover:scale-105 active:scale-95"
									onClick={handlePauseClicked}
								>
									{isPausing ? <Spinner size={20} /> : fetchInfo.queue[0]?.paused ? <Play /> : <Pause />}
								</Button>
							</HoverCardTrigger>
							<HoverCardContent className="bg-pallete2 text-white p-2 w-auto">{isPausing ? "Play" : "Pause"}</HoverCardContent>
						</HoverCard>

						<HoverCard openDelay={150} closeDelay={50}>
							<HoverCardTrigger>
								<Button
									className="rounded-full bg-accent2 hover:bg-accent1  hover:scale-105 active:scale-95"
									onClick={handleNextClicked}
								>
									{isSkipping ? <Spinner size={20} /> : <SkipForwardIcon />}
								</Button>
							</HoverCardTrigger>
							<HoverCardContent className="bg-pallete2 text-white p-2 w-auto">Skip current song</HoverCardContent>
						</HoverCard>
					</div>
					<Progress
						className="mt-2 h-[0.2rem]"
						value={fetchInfo.queue[0]?.tracks[0] ? Math.floor(100 * (fetchInfo.prog / fetchInfo.queue[0]?.tracks[0].duration)) : 0}
					/>
					<div className="text-white">
						{fetchInfo.queue[0]?.tracks[0]
							? `${fetchInfo.formatedprog} / ${fetchInfo.queue[0]?.tracks[0].durationFormatted}`
							: "00:00 / 00:00"}
					</div>
				</div>
			</div>
		</section>
	)
}

export default Player
