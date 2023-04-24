import Player from "@/components/section/Player"
import Queue from "@/components/section/Queue"
import UserSection from "@/components/section/UserSection"
import useFetchInfo from "@/hooks/useFetchInfo"
import useUser from "@/hooks/useUser"
import { Toast, ToastTitle, ToastDescription, ToastViewport } from "@/components/ui/toast"
import { useRouter } from "next/router"
import React, { useState } from "react"
import Spinner from "@/components/ui/Spinner"
import useWindowSize from "@/hooks/useWindowSize"
import type { NextPage } from "next"

const Home: NextPage = () => {
	const [toastOpen, setToastOpen] = useState(false)
	const [toastTitle, setToastTitle] = useState("test")
	const [toastDescription, setToastDescription] = useState("testtest")
	const [toastVariant, setToastVariant] = useState<"default" | "destructive" | "inform">("default")
	const router = useRouter()
	const windowSize = useWindowSize()
	const { data: apiUser, isLoading, error } = useUser()
	const { data: fetchInfo, isLoading: isFetchingInfo, error: fetchingInfoError } = useFetchInfo()

	if (isLoading)
		return (
			<div className="h-[100vh]">
				<Spinner size={windowSize.width ? windowSize.width / 10 : 150} />
			</div>
		)
	if (error) router.push("/auth")
	if (!apiUser) return <div></div>

	if (isFetchingInfo)
		return (
			<div className="h-[100vh]">
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

	const isAdmin = fetchInfo?.admins.usernames.includes(apiUser.user_metadata.full_name)

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
		<main className={`w-full grid gap-5 p-[1rem] mb-[3rem] xl:mb-0 xl:grid-cols-2 xl:h-[100vh] xl:max-h-[100vh] bg-pallete1`}>
			<div className={`grid gap-5 grid-flow-row grid-rows-[20rem_1fr] xl:max-h-[calc(100vh-2rem)]`}>
				<Player {...props} />
				<Queue {...props} />
			</div>
			<div className={`w-full max-h-[calc(100vh-2rem)]`}>
				<UserSection {...props} />
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
