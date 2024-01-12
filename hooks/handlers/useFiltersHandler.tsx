import { defaultProps } from "@/types"
import { baseFilters } from "@/utils/constants"
import { supabase } from "@/utils/supabaseUtils"
import axios from "axios"
import { useState } from "react"

const useFiltersHandler = (props: defaultProps) => {
	const { isAdmin, setToastColor, setToastDescription, setToastOpen, setToastTitle } = props
	const [isApplying, setIsApplying] = useState<boolean>(false)
	const [effects, setEffects] = useState<Effects>(baseFilters)

	function handleEffectChange(effect: keyof Effects, value?: number) {
		if (effect === "speed" || effect === "bassboost") {
			if (!value) return
			setEffects(prev => ({ ...prev, [effect]: value }))
		}

		if (typeof effects[effect] === "boolean") {
			setEffects(prev => ({ ...prev, [effect]: !prev[effect] }))
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

	return {
		effects,
		handleEffectChange,
		handlefilterSubmitted
	}
}

export default useFiltersHandler
