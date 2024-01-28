import { defaultProps } from "@/types"
import { supabase } from "@/utils/supabaseUtils"
import axios, { AxiosError } from "axios"
import { useState } from "react"

const usePlayerHandler = (props: defaultProps) => {
	const { fetchInfo, isAdmin, setToastColor, setToastDescription, setToastOpen, setToastTitle } = props
	const [isPausing, setIsPausing] = useState<boolean>(false)
	const [isSkipping, setIsSkipping] = useState<boolean>(false)
	const [isLeaving, setIsLeaving] = useState<boolean>(false)
	const [isStopping, setIsStopping] = useState<boolean>(false)

	const queue = fetchInfo.queue[0]?.tracks || []
	const currentSongId = queue[0]?.id

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
				"/api/music/skip",
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: (await supabase.auth.getSession()).data?.session?.access_token
					}
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
					"/api/music/unpause",
					{},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: (await supabase.auth.getSession()).data?.session?.access_token
						}
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
					{},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: (await supabase.auth.getSession()).data?.session?.access_token
						}
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
				"/api/music/stop",
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: (await supabase.auth.getSession()).data?.session?.access_token
					}
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
				"/api/music/disconnect",
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: (await supabase.auth.getSession()).data?.session?.access_token
					}
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

	return {
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
	}
}

export default usePlayerHandler
