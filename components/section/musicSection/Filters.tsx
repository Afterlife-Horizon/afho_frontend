import React, { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { supabase } from "@/utils/supabaseUtils"
import { ScrollArea } from "@/components/ui/scroll-area"
import ScrollDiv from "@/components/ui/ScrollDiv"

const Filters: React.FC<defaultProps> = ({ isAdmin, setToastColor, setToastDescription, setToastOpen, setToastTitle }) => {
	const [isApplying, setIsApplying] = useState<boolean>(false)
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
		treble: false
	})

	function handleEffectChange(effect: string, value?: number) {
		if (effect === "speed" || effect === "bassboost") {
			if (!value) return
			setEffects(prev => ({ ...prev, [effect]: value }))
		}

		if (typeof effects[effect as keyof effects] === "boolean") {
			setEffects(prev => ({ ...prev, [effect]: !prev[effect as keyof effects] }))
		}
	}

	function handlefilterSubmitted(event: any) {
		const changeSongFilter = async () => {
			const url = "/api/filters"
			await axios
				.post(
					url,
					{
						filters: { ...effects },
						access_token: (await supabase.auth.getSession()).data?.session?.access_token
					},
					{
						headers: { "Content-Type": "application/json" }
					}
				)
				.then(() => {
					setIsApplying(false)
				})
				.catch(err => {
					const data = err.response?.data as { error: string }
					setToastOpen(true)
					setToastTitle(`${err.response?.status} - ${err.response?.statusText}`)
					setToastDescription(data.error)
					setToastColor("destructive")
					setIsApplying(false)
				})
		}

		if (isApplying) return
		if (!isAdmin) {
			setToastOpen(true)
			setToastTitle(``)
			setToastDescription("You are not an admin")
			setToastColor("inform")
			return
		}

		setIsApplying(true)
		changeSongFilter()
	}

	return (
		<div className="grid grid-rows-[3rem_3rem_3rem_1fr] gap-[0.2rem] mx-auto rounded-b-lg">
			<div className="w-full p-2">
				<Button className="w-full bg-accent2 hover:bg-accent1 rounded-full active:scale-95" onClick={handlefilterSubmitted}>
					Apply
				</Button>
			</div>

			<ScrollDiv className="flex flex-wrap w-full h-[calc(100vh-2rem-21rem-8rem)] pr-3 pl-5">
				<div className="w-full mx-auto flex flex-row justify-start gap-10 my-2">
					<label htmlFor="speed" className="w-[20%]">
						Speed
					</label>
					<Input
						className="w-full"
						type="number"
						id="speed"
						placeholder={effects.speed.toString()}
						onChange={e => handleEffectChange("speed", Number(e.target.value))}
					/>
				</div>
				<div className="w-full mx-auto flex flex-row justify-start gap-10 my-2">
					<label htmlFor="bassboost" className="w-[20%]">
						Bass Boost
					</label>
					<Input
						className="w-full"
						type="number"
						id="bassboost"
						placeholder={effects.bassboost.toString()}
						onChange={e => handleEffectChange("bassboost", Number(e.target.value))}
					/>
				</div>
				{Object.keys(effects).map(effect => {
					if (typeof effects[effect as keyof effects] === "boolean") {
						return (
							<div key={effect} className="w-full mx-auto flex flex-row justify-start gap-10 my-2">
								<label htmlFor={effect} className="w-[20%]">
									{effect}
								</label>
								{effects[effect as keyof effects] ? (
									<Button className="w-full bg-accent2 hover:bg-accent1" onClick={() => handleEffectChange(effect)}>
										ON
									</Button>
								) : (
									<Button className="w-full bg-pallete1  hover:bg-accent1 " onClick={() => handleEffectChange(effect)}>
										OFF
									</Button>
								)}
							</div>
						)
					}
				})}
			</ScrollDiv>
		</div>
	)
}

export default Filters
