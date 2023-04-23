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
	const { data: apiUser, isLoading, error } = useUser()
	const { data: fetchInfo, isLoading: isFetchingInfo, error: fetchingInfoError } = useFetchInfo()
	const windowSize = useWindowSize()
	const sectionRef = React.useRef<HTMLDivElement>(null)

	if (isLoading)
		return <div className="h-[100vh]">{windowSize.width && windowSize.width > 1200 ? <Spinner size={300} /> : <Spinner size={150} />}</div>
	if (error) router.push("/auth")
	if (!apiUser) return <div></div>

	if (isFetchingInfo)
		return <div className="h-[100vh]">{windowSize.width && windowSize.width > 1200 ? <Spinner size={300} /> : <Spinner size={150} />}</div>
	if (fetchingInfoError) {
		setToastOpen(true)
		setToastTitle("Error")
		setToastDescription(fetchingInfoError.message)
		setToastVariant("destructive")
		return <div>{fetchingInfoError.message}</div>
	}

	const isAdmin = fetchInfo?.admins.usernames.includes(apiUser.user_metadata.full_name)

	return (
		<main
			className={`grid p-[1rem] ${
				windowSize.width && windowSize.width < 1200 ? "mb-[3rem]" : "grid-cols-2 h-[100vh] max-h-[100vh]"
			} bg-pallete1`}
		>
			<div
				ref={sectionRef}
				className={`grid gap-5 grid-flow-row grid-rows-[40%_1fr] ${
					windowSize.width && windowSize.width > 1200 ? "max-h-[calc(100vh-2rem)]" : ""
				}`}
			>
				<Player
					user={apiUser}
					fetchInfo={fetchInfo}
					isAdmin={isAdmin}
					setToastColor={setToastVariant}
					setToastDescription={setToastDescription}
					setToastOpen={setToastOpen}
					setToastTitle={setToastTitle}
				/>
				<Queue
					sectionRef={sectionRef}
					user={apiUser}
					fetchInfo={fetchInfo}
					isAdmin={isAdmin}
					setToastColor={setToastVariant}
					setToastDescription={setToastDescription}
					setToastOpen={setToastOpen}
					setToastTitle={setToastTitle}
				/>
			</div>
			<div className={`w-full max-h-[calc(100vh-2rem)]`}>
				<UserSection
					user={apiUser}
					fetchInfo={fetchInfo}
					isAdmin={isAdmin}
					setToastColor={setToastVariant}
					setToastDescription={setToastDescription}
					setToastOpen={setToastOpen}
					setToastTitle={setToastTitle}
				/>
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
