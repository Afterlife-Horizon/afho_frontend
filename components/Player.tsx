import Image from "next/image";
import { Button } from "./ui/button";
import React, { useState } from "react";
import { Progress } from "./ui/progress";
import { Pause, Play, PowerOffIcon, SkipForwardIcon, X } from "lucide-react";
import axios from "axios";

const Player: React.FC<defaultProps> = ({ fetchInfo, isAdmin }) => {
	const [playerInfoClasses, setPlayerInfoClasses] = useState<string>("hidden row-start-1 col-start-1 h-100% p-[1.5rem]");

	function handleMouseEnter() {
		setPlayerInfoClasses((prev) => prev.replace("hidden", "grid"));
	}
	function handleMouseLeave() {
		setPlayerInfoClasses((prev) => prev.replace("grid", "hidden"));
	}

	return (
		<section
			className="bg-pallete2 rounded-lg grid w-[85%] mx-auto mt-[1rem] shadow hover:scale-[1.02] [&:hover>img]:blur-[5px] [&:hover>img]:brightness-[0.5]"
			onMouseEnter={() => handleMouseEnter()}
			onMouseLeave={() => handleMouseLeave()}
		>
			<Image
				className="row-start-1 rounded-lg col-start-1 select-none"
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
								<Button className="rounded-full hover:scale-105 active:scale-95">
									<PowerOffIcon />
								</Button>
								<Button className="rounded-full hover:scale-105 active:scale-95">
									<X />
								</Button>
							</>
						) : null}
						<Button className="rounded-full hover:scale-105 active:scale-95">{fetchInfo.queue[0]?.paused ? <Play /> : <Pause />}</Button>
						<Button className="rounded-full hover:scale-105 active:scale-95">
							<SkipForwardIcon />
						</Button>
					</div>
					<Progress className="mt-2 h-[0.2rem]" value={fetchInfo.queue[0]?.tracks[0] ? Math.floor(100 * (fetchInfo.prog / fetchInfo.queue[0]?.tracks[0].duration)) : 0} />
					<div className="text-white">{fetchInfo.queue[0]?.tracks[0] ? `${fetchInfo.formatedprog} / ${fetchInfo.queue[0]?.tracks[0].durationFormatted}` : "00:00 / 00:00"}</div>
				</div>
			</div>
		</section>
	);
};

export default Player;
