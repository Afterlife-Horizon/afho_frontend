import { Toast, ToastTitle, ToastDescription, ToastViewport } from "components/ui/toast"
import UserSection from "components/section/UserSection"
import Spinner from "components/ui/Spinner"
import useFetchInfo from "hooks/useFetchInfo"
import useUser from "hooks/useUser"
import useWindowSize from "hooks/useWindowSize"
import { useState, useEffect } from "react"
import { defaultProps } from "types"
import { useNavigate } from "@tanstack/react-router"

const IndexRouteComponent = () => {
	const [toastOpen, setToastOpen] = useState(false)
	const [toastTitle, setToastTitle] = useState("")
	const [toastDescription, setToastDescription] = useState("")
	const [toastVariant, setToastVariant] = useState<"default" | "destructive" | "inform">("default")
	const [theme, setTheme] = useState("default")
	const navigate = useNavigate()
	const windowSize = useWindowSize()

	const jwt = localStorage.getItem("token")
	if (jwt === null || jwt === "undefined") {
		navigate({ to: "/auth" })
	}
	const { data: apiUser, isLoading, error } = useUser(jwt)
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
	if (error) navigate({ to: "/auth" })
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

	const isAdmin = fetchInfo?.admins.includes(apiUser.username)

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
			{/* <div className='rid grid-flow-row grid-rows-[20rem_1fr] gap-5 xl:max-h-[calc(100dvh-2rem)]'>
				<Player {...props} />
				<MusicSection {...props} />
			</div> */}
			<section className="mx-auto flex-row w-full gap-2 rounded-lg bg-background-medium text-dark shadow md:gap-0">
				<div className="m-2 p-10 bg-red-500 text-center rounded-3xl">Temporarly disabled music features</div>
			</section>
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

export default IndexRouteComponent
