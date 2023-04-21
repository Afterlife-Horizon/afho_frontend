import Image from "next/image";
import { Button } from "./ui/button";
import React, { useState } from "react";
import { Progress } from "./ui/progress";
import { Pause, Play, PowerOffIcon, SkipForwardIcon, X } from "lucide-react";
import axios, { AxiosError } from "axios";
import { supabase } from "@/utils/supabaseUtils";
import Spinner from "./ui/Spinner";
import useWindowSize from "@/hooks/useWindowSize";

const Player = React.forwardRef<HTMLDivElement, defaultProps>(({ user, fetchInfo, isAdmin, setToastColor, setToastDescription, setToastOpen, setToastTitle }, ref) => {
	const [playerInfoClasses, setPlayerInfoClasses] = useState<string>("hidden row-start-1 col-start-1 h-auto p-[1.5rem]");
	const [isPausing, setIsPausing] = useState<boolean>(false);
	const [isSkipping, setIsSkipping] = useState<boolean>(false);
	const [isLeaving, setIsLeaving] = useState<boolean>(false);
	const [isStopping, setIsStopping] = useState<boolean>(false);
	const queue = fetchInfo.queue[0]?.tracks || [];
	const windowSize = useWindowSize();

	function handleMouseEnter() {
		setPlayerInfoClasses((prev) => prev.replace("hidden", "grid"));
	}

	function handleMouseLeave() {
		setPlayerInfoClasses((prev) => prev.replace("grid", "hidden"));
	}

	async function handleNextClicked(_event: React.MouseEvent<HTMLButtonElement>) {
		setIsSkipping(true);

		if (!queue || queue.length < 2) {
			setIsSkipping(false);
			setToastOpen(true);
			setToastTitle(``);
			setToastDescription("No song to skip to!");
			setToastColor("inform");
			return;
		}
		await axios
			.post(
				"/api/skip",
				{
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
		setIsSkipping(false);
	}

	async function handlePauseClicked(_event: React.MouseEvent<HTMLButtonElement>) {
		setIsPausing(true);

		if (!queue || queue.length < 1) {
			setIsPausing(false);
			setToastOpen(true);
			setToastTitle(``);
			setToastDescription("No song to pause!");
			setToastColor("inform");
			return;
		}

		if (fetchInfo.queue[0].paused) {
			await axios
				.post(
					"/api/unpause",
					{
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
		} else {
			await axios
				.post(
					"/api/pause",
					{
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
		setIsPausing(false);
	}

	async function handleStopClicked(_event: React.MouseEvent<HTMLButtonElement>) {
		setIsStopping(true);

		if (!isAdmin) {
			setIsStopping(false);
			setToastOpen(true);
			setToastTitle(``);
			setToastDescription("You need to be admin!");
			setToastColor("inform");
			return;
		}

		if (!queue || queue.length < 1) {
			setIsStopping(false);
			setToastOpen(true);
			setToastTitle(``);
			setToastDescription("No song to stop!");
			setToastColor("inform");
			return;
		}

		await axios
			.post(
				"/api/stop",
				{
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
		setIsStopping(false);
	}

	async function handleDisconnectClicked(_event: React.MouseEvent<HTMLButtonElement>) {
		if (isLeaving) return;
		setIsLeaving(true);

		if (!isAdmin) {
			setIsLeaving(false);
			setToastOpen(true);
			setToastTitle(``);
			setToastDescription("You need to be admin!");
			setToastColor("inform");
			return;
		}

		await axios
			.post(
				"/api/disconnect",
				{
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
		setIsLeaving(false);
	}

	return (
		<section
			ref={ref}
			className={`bg-pallete2 rounded-lg grid h-[100%]  ${
				windowSize.width && windowSize.width < 1200 ? "w-[90%]" : ""
			} mx-auto shadow hover:scale-[1.02] [&:hover>img]:blur-[5px] [&:hover>img]:brightness-[0.5]`}
			onMouseEnter={() => handleMouseEnter()}
			onMouseLeave={() => handleMouseLeave()}
		>
			<Image
				className="row-start-1 rounded-lg col-start-1 select-none h-[100%] overflow-hidden object-cover"
				src={fetchInfo.queue[0]?.tracks[0]?.thumbnail.url ? fetchInfo.queue[0].tracks[0].thumbnail.url : "https://cdn.tosavealife.com/wp-content/uploads/2018/05/Waiting-Memes-52918.jpg"}
				width={1920}
				height={1080}
				alt="thumbnail"
			/>
			<div className={playerInfoClasses} style={{ zIndex: 1 }}>
				<div className="text-white">
					<a className="text-blue-400" href={`https://www.youtube.com/watch?v=${fetchInfo.queue[0]?.tracks[0]?.id ? fetchInfo.queue[0]?.tracks[0]?.id : ""}`}>
						{fetchInfo.queue[0]?.tracks[0]?.title ? fetchInfo.queue[0].tracks[0].title : "None"}
					</a>
					<div className="invert-0">Requested by: {fetchInfo.queue[0]?.tracks[0]?.requester.username ? fetchInfo.queue[0]?.tracks[0]?.requester.username : "None"}</div>
				</div>
				<div className="self-end">
					<div className="flex gap-2 select-none">
						{isAdmin ? (
							<>
								<Button className="rounded-full hover:scale-105 active:scale-95" onClick={handleDisconnectClicked}>
									{isLeaving ? <Spinner size={30} /> : <PowerOffIcon />}
								</Button>
								<Button className="rounded-full hover:scale-105 active:scale-95" onClick={handleStopClicked}>
									{isStopping ? <Spinner size={30} /> : <X />}
								</Button>
							</>
						) : null}
						<Button className="rounded-full hover:scale-105 active:scale-95" onClick={handlePauseClicked}>
							{isPausing ? <Spinner size={30} /> : fetchInfo.queue[0]?.paused ? <Play /> : <Pause />}
						</Button>
						<Button className="rounded-full hover:scale-105 active:scale-95" onClick={handleNextClicked}>
							{isSkipping ? <Spinner size={30} /> : <SkipForwardIcon />}
						</Button>
					</div>
					<Progress className="mt-2 h-[0.2rem]" value={fetchInfo.queue[0]?.tracks[0] ? Math.floor(100 * (fetchInfo.prog / fetchInfo.queue[0]?.tracks[0].duration)) : 0} />
					<div className="text-white">{fetchInfo.queue[0]?.tracks[0] ? `${fetchInfo.formatedprog} / ${fetchInfo.queue[0]?.tracks[0].durationFormatted}` : "00:00 / 00:00"}</div>
				</div>
			</div>
		</section>
	);
});

export default Player;
