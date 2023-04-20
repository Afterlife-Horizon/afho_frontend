import Player from "@/components/Player";
import Queue from "@/components/Queue";
import UserSection from "@/components/UserSection";
import useFetchInfo from "@/hooks/useFetchInfo";
import useUser from "@/hooks/useUser";
import { Toast, ToastTitle, ToastDescription, ToastViewport } from "@/components/ui/toast";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Spinner from "@/components/ui/Spinner";
import useWindowSize from "@/hooks/useWindowSize";
import { NextPage } from "next";

const Home: NextPage = () => {
	const [toastOpen, setToastOpen] = useState(false);
	const [toastTitle, setToastTitle] = useState("test");
	const [toastDescription, setToastDescription] = useState("testtest");
	const [toastVariant, setToastVariant] = useState<"default" | "destructive" | "inform">("default");
	const router = useRouter();
	const { data: apiUser, isLoading, error } = useUser();
	const { data: fetchInfo, isLoading: isFetchingInfo, error: fetchingInfoError } = useFetchInfo();
	const windowSize = useWindowSize();

	if (isLoading)
		return (
			<div className="h-[100vh]">
				<Spinner size={300} />
			</div>
		);
	if (error) router.push("/auth");
	if (!apiUser) return <div></div>;

	if (isFetchingInfo)
		return (
			<div className="h-[100vh]">
				<Spinner size={300} />
			</div>
		);
	if (fetchingInfoError) {
		setToastOpen(true);
		setToastTitle("Error");
		setToastDescription(fetchingInfoError.message);
		setToastVariant("destructive");
		return <div>{fetchingInfoError.message}</div>;
	}

	const isAdmin = fetchInfo?.admins.usernames.includes(apiUser.user_metadata.full_name);

	return (
		<main className={`flex ${windowSize.width && windowSize.width < 1200 ? "flex-col mb-[3rem]" : "h-[100vh]"} bg-pallete1`}>
			<div className={`${windowSize.width && windowSize.width < 1200 ? "w-full" : "w-[50%]"}`}>
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
					user={apiUser}
					fetchInfo={fetchInfo}
					isAdmin={isAdmin}
					setToastColor={setToastVariant}
					setToastDescription={setToastDescription}
					setToastOpen={setToastOpen}
					setToastTitle={setToastTitle}
				/>
			</div>
			<div className={`${windowSize.width && windowSize.width < 1200 ? "w-full" : "w-[50%]"}`}>
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
	);
};

export default Home;
