import Player from "@/components/section/Player"
import UserSection from "@/components/section/UserSection"
import useFetchInfo from "@/hooks/useFetchInfo"
import useUser from "@/hooks/useUser"
import { Toast, ToastTitle, ToastDescription, ToastViewport } from "@/components/ui/toast"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Spinner from "@/components/ui/Spinner"
import useWindowSize from "@/hooks/useWindowSize"
import type { NextPage } from "next"
import MusicSection from "@/components/section/MusicSection"
import { defaultProps } from "@/types"
import { Drawer } from "@/components/ui/drawer"

const Home: NextPage = () => {
	const [toastOpen, setToastOpen] = useState(false)
	const [toastTitle, setToastTitle] = useState("")
	const [toastDescription, setToastDescription] = useState("")
	const [toastVariant, setToastVariant] = useState<"default" | "destructive" | "inform">("default")
	const [theme, setTheme] = useState("default")
	const router = useRouter()
	const windowSize = useWindowSize()
	const { data: apiUser, isLoading, error } = useUser()
	const { data: fetchInfo, isLoading: isFetchingInfo, error: fetchingInfoError } = useFetchInfo()

	useEffect(() => {
		const theme = localStorage.getItem("theme")
		if (theme) setTheme(theme)
	}, [])

	if (isLoading)
		return (
			<div className="h-[100dvh]">
				<Spinner size={windowSize.width ? windowSize.width / 10 : 150} />
			</div>
		)
	if (error) router.push("/auth")
	if (!apiUser) return <div></div>

	if (isFetchingInfo)
		return (
			<div className="h-[100dvh]">
				<Spinner size={windowSize.width ? windowSize.width / 10 : 150} />
			</div>
		)
	if (fetchingInfoError) {
		setToastOpen(true)
		setToastTitle("Error")
		setToastDescription(fetchingInfoError.message)
		setToastVariant("destructive")
		return <div>{fetchingInfoError.message}</div>
	}

	const isAdmin = fetchInfo?.admins.includes(apiUser.user_metadata.full_name)

	const props: defaultProps = {
		user: apiUser,
		fetchInfo,
		isAdmin,
		setToastColor: setToastVariant,
		setToastDescription,
		setToastOpen,
		setToastTitle
	}

	return (
		<main
			className={`theme-${theme} mb-[3rem] grid w-full gap-5 bg-background-dark p-[1rem] xl:mb-0 xl:h-[100dvh] xl:max-h-[100dvh] xl:grid-cols-2`}
		>
			<div className={`grid grid-flow-row grid-rows-[20rem_1fr] gap-5 xl:max-h-[calc(100dvh-2rem)]`}>
				<Player {...props} />
				<MusicSection {...props} />
			</div>
			<div className={`max-h-[calc(100dvh-2rem)] w-full`}>
				<UserSection {...props} theme={theme} setTheme={setTheme} />
			</div>
			<Toast className="flex flex-col items-start" variant={toastVariant} open={toastOpen} onOpenChange={setToastOpen}>
				<ToastTitle>{toastTitle}</ToastTitle>
				<ToastDescription>{toastDescription}</ToastDescription>
			</Toast>
			<ToastViewport />
		</main>
	)
}

export default Home
