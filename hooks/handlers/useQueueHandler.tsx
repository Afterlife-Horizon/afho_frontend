import { defaultProps } from "@/types"
import { supabase } from "@/utils/supabaseUtils"
import axios, { AxiosError } from "axios"
import { useCallback, useMemo, useRef, useState } from "react"

const useQueueHandler = (props: defaultProps) => {
	const { fetchInfo, isAdmin, setToastColor, setToastDescription, setToastOpen, setToastTitle } = props
	const [searchInput, setSearchInput] = useState<string>("")
	const [isAdding, setIsAdding] = useState<boolean>(false)
	const [isAddingFirst, setIsAddingFirst] = useState<boolean>(false)
	const [isShuffling, setIsShuffling] = useState<boolean>(false)
	const [isClearing, setIsClearing] = useState<boolean>(false)
	const [isRemoving, setIsRemoving] = useState<Map<number, boolean>>(new Map())
	const [isSkipping, setIsSkipping] = useState<Map<number, boolean>>(new Map())
	const [count, setCount] = useState<number>(15)

	const hasMore = useMemo(() => fetchInfo.queue[0]?.tracks.length > count, [count, fetchInfo.queue])
	const queue = fetchInfo.queue[0]?.tracks.slice(1, hasMore ? count : fetchInfo.queue[0]?.tracks.length) || []

	const observer = useRef<IntersectionObserver>()
	const lastRequestRef = useCallback(
		(node: any) => {
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasMore) setCount(prevCount => prevCount + 10)
			})
			if (node) observer.current.observe(node)
		},
		[hasMore]
	)

	function handleAdd() {
		async function addSong() {
			await axios
				.post(
					"/api/play",
					{
						songs: searchInput
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: (await supabase.auth.getSession()).data?.session?.access_token
						}
					}
				)
				.then(() => {
					setIsAdding(false)
					setSearchInput("")
				})
				.catch((err: AxiosError) => {
					const data = err.response?.data as { error: string }
					setToastOpen(true)
					setToastTitle(`${err.response?.status} - ${err.response?.statusText}`)
					setToastDescription(data.error)
					setToastColor("destructive")
					setIsAdding(false)
					setSearchInput("")
				})
		}

		if (isAdding) return
		setIsAdding(true)
		if (searchInput === "") {
			setToastOpen(true)
			setToastTitle(``)
			setToastDescription("Please enter a song name or url")
			setToastColor("inform")
			return setIsAdding(false)
		}
		addSong()
	}

	function handleAddFirst() {
		async function AddFirst() {
			await axios
				.post(
					"/api/playfirst",
					{
						songs: searchInput
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: (await supabase.auth.getSession()).data?.session?.access_token
						}
					}
				)
				.then(() => {
					setSearchInput("")
					setIsAddingFirst(false)
				})
				.catch((err: AxiosError) => {
					const data = err.response?.data as string
					setToastOpen(true)
					setToastTitle(`${err.response?.status} - ${err.response?.statusText}`)
					setToastDescription(data)
					setToastColor("destructive")
					setSearchInput("")
					setIsAddingFirst(false)
				})
		}

		if (isAddingFirst) return
		if (searchInput === "") {
			setToastOpen(true)
			setToastTitle(``)
			setToastDescription("Please enter a song name or url")
			setToastColor("inform")
			return setIsAddingFirst(false)
		}
		setIsAddingFirst(true)
		AddFirst()
	}

	function handleShuffle() {
		async function shuffleSongs() {
			const url = "/api/shuffle"
			await axios
				.post(
					url,
					{},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: (await supabase.auth.getSession()).data?.session?.access_token
						}
					}
				)
				.then(() => {
					setIsShuffling(false)
				})
				.catch((err: AxiosError) => {
					const data = err.response?.data as { error: string }
					setToastOpen(true)
					setToastTitle(`${err.response?.status} - ${err.response?.statusText}`)
					setToastDescription(data.error)
					setToastColor("destructive")
					setIsShuffling(false)
				})
		}

		if (isShuffling) return
		setIsShuffling(true)
		if (!queue || queue.length < 3) {
			setToastOpen(true)
			setToastTitle(``)
			setToastDescription("No songs to shuffle")
			setToastColor("inform")
			return setIsShuffling(false)
		}
		setIsShuffling(true)
		shuffleSongs()
	}

	function handleClear() {
		async function clearSongs() {
			const url = "/api/clearqueue"
			await axios
				.post(
					url,
					{},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: (await supabase.auth.getSession()).data?.session?.access_token
						}
					}
				)
				.then(() => {
					setIsClearing(false)
				})
				.catch(err => {
					const data = err.response?.data as { error: string }
					setToastOpen(true)
					setToastTitle(`${err.response?.status} - ${err.response?.statusText}`)
					setToastDescription(data.error)
					setToastColor("destructive")
					setIsClearing(false)
				})
		}

		if (isClearing) return
		setIsClearing(true)
		if (!isAdmin) {
			setToastOpen(true)
			setToastTitle(``)
			setToastDescription("You are not an admin")
			setToastColor("inform")
			return setIsClearing(false)
		}

		if (!queue || queue.length < 2) {
			setToastOpen(true)
			setToastTitle(``)
			setToastDescription("No songs to clear")
			setToastColor("inform")
			return setIsClearing(false)
		}
		clearSongs()
	}

	function handleRemove(id: number) {
		async function remove() {
			const url = "/api/remove"
			await axios
				.post(
					url,
					{
						queuePos: id
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: (await supabase.auth.getSession()).data?.session?.access_token
						}
					}
				)
				.then(() => {
					setIsRemoving(() => {
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
					setIsRemoving(() => {
						const newMap = new Map()
						newMap.set(id, false)
						return newMap
					})
				})
		}

		if (isRemoving.get(id)) return
		if (!isAdmin) {
			setToastOpen(true)
			setToastTitle(``)
			setToastDescription("You are not an admin")
			setToastColor("inform")
			return
		}

		if (!queue || queue.length === 0) {
			setToastOpen(true)
			setToastTitle(``)
			setToastDescription("No songs to remove")
			setToastColor("inform")
			return
		}
		setIsRemoving(() => {
			const newMap = new Map()
			newMap.set(id, true)
			return newMap
		})
		remove()
	}

	function handleskipto(id: number) {
		async function skipto() {
			await axios
				.post(
					"/api/skipto",
					{
						queuePos: id
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: (await supabase.auth.getSession()).data?.session?.access_token
						}
					}
				)
				.then(() => {
					setIsSkipping(() => {
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
					setIsSkipping(() => {
						const newMap = new Map()
						newMap.set(id, false)
						return newMap
					})
				})
		}

		if (isSkipping.get(id)) return
		if (!isAdmin) {
			setToastOpen(true)
			setToastTitle(``)
			setToastDescription("You are not an admin")
			setToastColor("inform")
			return
		}

		if (!queue || queue.length === 0) {
			setToastOpen(true)
			setToastTitle(``)
			setToastDescription("No songs to skip to")
			setToastColor("inform")
			return
		}
		setIsSkipping(() => {
			const newMap = new Map()
			newMap.set(id, true)
			return newMap
		})
		skipto()
	}

	return {
		queue,
		searchInput,
		isAdding,
		isAddingFirst,
		isRemoving,
		isShuffling,
		isClearing,
		isSkipping,
		lastRequestRef,
		setSearchInput,
		handleAdd,
		handleAddFirst,
		handleRemove,
		handleShuffle,
		handleskipto,
		handleClear
	}
}

export default useQueueHandler
