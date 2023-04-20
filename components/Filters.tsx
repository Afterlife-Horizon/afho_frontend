import React, { useState } from "react";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { supabase } from "@/utils/supabaseUtils";

const Filters: React.FC<defaultProps> = ({ isAdmin, setToastColor, setToastDescription, setToastOpen, setToastTitle }) => {
	const [isApplying, setIsApplying] = useState<boolean>(false);
	const [effects, setEffects] = useState<effects>({
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

	function handleEffectChange(effect: string, value?: number) {
		if (effect === "speed" || effect === "bassboost") {
			if (!value) return;
			setEffects((prev) => ({ ...prev, [effect]: value }));
		}

		if (typeof effects[effect as keyof effects] === "boolean") {
			const prev = effects[effect as keyof effects] as boolean;
			setEffects((prev) => ({ ...prev, [effect]: !prev[effect as keyof effects] }));
		}
	}

	const handlefilterSubmitted = (event: any) => {
		const changeSongFilter = async () => {
			const url = "/api/filters";
			await axios
				.post(
					url,
					{
						filters: { ...effects },
						access_token: (await supabase.auth.getSession()).data?.session?.access_token,
					},
					{
						headers: { "Content-Type": "application/json" },
					}
				)
				.catch((err) => {
					const data = err.response?.data as { error: string };
					setToastOpen(true);
					setToastTitle(`${err.response?.status} - ${err.response?.statusText}`);
					setToastDescription(data.error);
					setToastColor("destructive");
				});
		};

		if (isApplying) return;
		if (!isAdmin) {
			setToastOpen(true);
			setToastTitle(``);
			setToastDescription("You are not an admin");
			setToastColor("inform");
			return;
		}

		setIsApplying(true);
		changeSongFilter();
		setIsApplying(false);
	};

	return (
		<div className="flex flex-col gap-[0.35rem] w-[90%] mx-auto mt-5">
			<div className="w-full">
				<Button className="w-full bg-accent2 hover:bg-accent1 rounded-full active:scale-95" onClick={handlefilterSubmitted}>
					Apply
				</Button>
			</div>
			<div className="flex flex-row gap-3">
				<label htmlFor="speed" className="w-[7rem]">
					Speed
				</label>
				<Input className="w-[20%]" type="number" defaultValue={0} id="speed" onChange={(e) => handleEffectChange("speed", Number(e.target.value))} />
			</div>
			<div className="flex flex-row gap-3">
				<label htmlFor="bassboost" className="w-[7rem]">
					Bass Boost
				</label>
				<Input className="w-[20%]" type="number" defaultValue={0} id="bassboost" onChange={(e) => handleEffectChange("bassboost", Number(e.target.value))} />
			</div>
			{Object.keys(effects).map((effect) => {
				if (typeof effects[effect as keyof effects] === "boolean") {
					return (
						<div key={effect} className="w-full flex flex-row justify-start gap-2">
							<label htmlFor={effect} className="w-[20%]">
								{effect}
							</label>
							<Switch id={effect} onChange={(e) => handleEffectChange(effect)} />
							<div>{effects[effect as keyof effects] ? "On" : "Off"}</div>
						</div>
					);
				}
			})}
		</div>
	);
};

export default Filters;
