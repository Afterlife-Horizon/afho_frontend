import { defaultProps } from "types"
import { supabase } from "utils/supabaseUtils"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { QueryClient } from "@tanstack/react-query"
import { fav } from "types/music"

const queryClient = new QueryClient()

const useFavoritesHandler = (props: defaultProps) => {
	const { setToastOpen, setToastColor, setToastDescription, setToastTitle } = props
	const [favField, setFavField] = useState<string>("")
	const [isAdding, setIsAdding] = useState<boolean>(false)
	const [isDeleting, setIsDeleting] = useState<Map<string, boolean>>(new Map())
	const [isPlaying, setIsPlaying] = useState<Map<string, boolean>>(new Map())

	async function addFav() {
		if (isAdding) return

		if (favField === "") {
			setToastOpen(true)
			setToastTitle(``)
			setToastDescription("Please enter a song name or url")
			setToastColor("inform")
			return setIsAdding(false)
		}
		setIsAdding(true)
		await axios
			.post(
				"/api/music/addFav",
				{
					url: favField
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: (await supabase.auth.getSession()).data?.session?.access_token
					}
				}
			)
			.then(() => {
				queryClient.refetchQueries(["favorites", "user"])
				setFavField("")
				setIsAdding(false)
			})
			.catch((err: AxiosError) => {
				const data = err.response?.data as { error: string }
				setToastOpen(true)
				setToastTitle(`${err.response?.status} - ${err.response?.statusText}`)
				setToastDescription(data.error)
				setToastColor("destructive")
				queryClient.invalidateQueries(["favorites", "user"])
				setFavField("")
				setIsAdding(false)
			})
	}

	async function deleteFav(id: string) {
		if (isDeleting.get(id)) return
		setIsDeleting(() => {
			const newMap = new Map()
			newMap.set(id, true)
			return newMap
		})

		await axios
			.delete("/api/music/delFav", {
				data: {
					id
				},
				headers: {
					"Content-Type": "application/json",
					Authorization: (await supabase.auth.getSession()).data?.session?.access_token
				}
			})
			.then(() => {
				queryClient.invalidateQueries(["favorites", "user"])
				setIsDeleting(() => {
					const newMap = new Map()
					newMap.set(id, false)
					return newMap
				})
			})
			.catch((err: AxiosError) => {
				const data = err.response?.data as { error: string }
				setToastOpen(true)
				setToastTitle(`${err.response?.status} - ${err.response?.statusText}`)
				setToastDescription(data.error)
				setToastColor("destructive")
				setIsDeleting(() => {
					const newMap = new Map()
					newMap.set(id, false)
					return newMap
				})
				queryClient.invalidateQueries(["favorites", "user"])
			})
	}

	async function playFav(fav: fav) {
		if (isPlaying.get(fav.id)) return
		setIsPlaying(() => {
			const newMap = new Map()
			newMap.set(fav.id, true)
			return newMap
		})

		await axios
			.post(
				"/api/music/play",
				{
					songs: fav.url
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: (await supabase.auth.getSession()).data?.session?.access_token
					}
				}
			)
			.then(() => {
				setIsPlaying(() => {
					const newMap = new Map()
					newMap.set(fav.id, false)
					return newMap
				})
			})
			.catch((err: AxiosError) => {
				const data = err.response?.data as { error: string }
				setToastOpen(true)
				setToastTitle(`${err.response?.status} - ${err.response?.statusText}`)
				setToastDescription(data.error)
				setToastColor("destructive")
				setIsPlaying(() => {
					const newMap = new Map()
					newMap.set(fav.id, false)
					return newMap
				})
			})
	}

	return { favField, isAdding, isDeleting, isPlaying, addFav, deleteFav, playFav, setFavField }
}

export default useFavoritesHandler
