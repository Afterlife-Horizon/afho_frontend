import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ScrollDiv from "@/components/ui/ScrollDiv"
import { defaultProps } from "@/types"
import useFiltersHandler from "@/hooks/handlers/useFiltersHandler"
import { isKeyOf } from "@/utils/isKeyOf"
import { capitalize } from "@/functions/capitalize"

const Filters: React.FC<defaultProps> = props => {
	const { effects, handlefilterSubmitted, handleEffectChange } = useFiltersHandler(props)

	return (
		<div className="mx-auto grid grid-rows-[3rem_3rem_3rem_1fr] gap-[0.2rem] rounded-b-lg">
			<div className="w-full p-2">
				<Button className="w-full rounded-full bg-accent-dark hover:bg-accent-light active:scale-95" onClick={handlefilterSubmitted}>
					Apply
				</Button>
			</div>
			<ScrollDiv className="flex h-[calc(100dvh-2rem-21rem-8rem)] w-full flex-wrap pl-5 pr-3">
				{Object.keys(effects).map(effect => {
					if (!isKeyOf(effect, effects)) return <></>
					if (typeof effects[effect] === "number")
						return <NumberSelect effects={effects} effect={effect} handleEffectChange={handleEffectChange} />
					if (typeof effects[effect] === "boolean")
						return <BooleanSelect effects={effects} effect={effect} handleEffectChange={handleEffectChange} />
					return <></>
				})}
			</ScrollDiv>
		</div>
	)
}

const BooleanSelect = ({
	effects,
	effect,
	handleEffectChange
}: {
	effects: Effects
	effect: keyof Effects
	handleEffectChange: (effect: keyof Effects, value?: number) => void
}) => {
	return (
		<div key={effect} className="mx-auto my-2 flex w-full flex-row justify-start gap-10">
			<label htmlFor={effect} className="w-[20%]">
				{capitalize(effect)}
			</label>
			{effects[effect] ? (
				<Button className="w-full bg-accent-dark hover:bg-accent-light" onClick={() => handleEffectChange(effect)}>
					ON
				</Button>
			) : (
				<Button className="w-full bg-background-dark  hover:bg-accent-light " onClick={() => handleEffectChange(effect)}>
					OFF
				</Button>
			)}
		</div>
	)
}

const NumberSelect = ({
	effects,
	effect,
	handleEffectChange
}: {
	effects: Effects
	effect: keyof Effects
	handleEffectChange: (effect: keyof Effects, value?: number) => void
}) => {
	return (
		<div key={effect} className="mx-auto my-2 flex w-full flex-row justify-start gap-10">
			<label htmlFor={effect} className="w-[20%]">
				{capitalize(effect)}
			</label>
			<Input
				className="w-full"
				type="number"
				id={effect}
				placeholder={effects[effect].toString()}
				defaultValue={effects[effect].toString()}
				onChange={e => handleEffectChange(effect, Number(e.target.value))}
				min={0.1}
				max={2}
				step={0.1}
			/>
		</div>
	)
}

export default Filters
