import { useState } from "react";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Filters = () => {
	const [effects, setEffects] = useState({
		bassboost: 0,
		subboost: false,
		mcompand: false,
		haas: false,
		gate: false,
		karaoke: false,
		flanger: false,
		pulsator: false,
		surrounding: false,
		"3d": false,
		vaporwave: false,
		nightcore: false,
		phaser: false,
		normalizer: false,
		speed: 1,
		tremolo: false,
		vibrato: false,
		reverse: false,
		treble: false,
	});

	function handleEffectChange(effect: string) {
		if (typeof effects[effect] === "boolean") {
			const prev = effects[effect] as boolean;
			setEffects((prev) => ({ ...prev, [effect]: !prev[effect] }));
		}
	}

	return (
		<div className="flex flex-col gap-1 w-[90%] mx-auto mt-5">
			<div className="flex flex-row gap-3">
				<label htmlFor="speed">Speed</label>
				<Input className="w-[20%]" id="speed" onChange={(e) => handleEffectChange("speed")} />
			</div>
			<div className="flex flex-row gap-3">
				<label htmlFor="bassboost">Speed</label>
				<Input className="w-[20%]" id="bassboost" onChange={(e) => handleEffectChange("bassboost")} />
			</div>
			{Object.keys(effects).map((effect) => {
				if (typeof effects[effect] === "boolean") {
					return (
						<div key={effect} className="w-full flex flex-row justify-start gap-2">
							<label htmlFor={effect} className="w-[20%]">
								{effect}
							</label>
							<Switch id={effect} onChange={(e) => handleEffectChange(effect)} />
							<div>{effects[effect] ? "On" : "Off"}</div>
						</div>
					);
				}
			})}
			<div className="w-full">
				<Button className="w-full">Apply</Button>
			</div>
		</div>
	);
};

export default Filters;
