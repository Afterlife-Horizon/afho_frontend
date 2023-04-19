import Image from "next/image";
import { Button } from "./ui/button";
import React, { useState } from "react";
import Link from "next/link";
import { Progress } from "./ui/progress";
import { Pause, Play, PowerOffIcon, SkipForwardIcon, X } from "lucide-react";

const Player = () => {
	const [playerInfoClasses, setPlayerInfoClasses] = useState<string>("hidden row-start-1 col-start-1 h-100% p-[1.5rem]");
	const [paused, setPaused] = useState<boolean>(false);

	function handleMouseEnter() {
		setPlayerInfoClasses((prev) => prev.replace("hidden", "grid"));
	}
	function handleMouseLeave() {
		setPlayerInfoClasses((prev) => prev.replace("grid", "hidden"));
	}

	return (
		<section
			className="bg-pallete2 rounded-lg grid w-[85%] mx-auto mt-[1rem] shadow hover:scale-[1.02] [&:hover>img]:blur-[2px] [&:hover>img]:brightness-[0.75]"
			onMouseEnter={() => handleMouseEnter()}
			onMouseLeave={() => handleMouseLeave()}
		>
			<Image className="row-start-1 rounded-lg col-start-1 select-none" src="https://via.placeholder.com/1920x1080/f7f7f7/000000.jpg" width={1920} height={1080} alt="thumbnail" />
			<div className={playerInfoClasses} style={{ zIndex: 1 }}>
				<div>
					<Link className="text-blue-600" href={""}>
						Song Name
					</Link>
					<div>Requested by: -----</div>
				</div>
				<div className="self-end">
					<div className="flex gap-2 select-none">
						<Button className="rounded-full hover:scale-105 active:scale-95">
							<PowerOffIcon />
						</Button>
						<Button className="rounded-full hover:scale-105 active:scale-95">
							<X />
						</Button>
						<Button className="rounded-full hover:scale-105 active:scale-95">{paused ? <Play /> : <Pause />}</Button>
						<Button className="rounded-full hover:scale-105 active:scale-95">
							<SkipForwardIcon />
						</Button>
					</div>
					<Progress className="mt-2 h-[0.2rem]" value={30} />
					<div>00:00/00:00</div>
				</div>
			</div>
		</section>
	);
};

export default Player;
