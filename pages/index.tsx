import Player from "@/components/Player";
import Queue from "@/components/Queue";
import UserSection from "@/components/UserSection";
import useFetchInfo from "@/hooks/useFetchInfo";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter();
	const { data: apiUser, isLoading, error } = useUser();
	const { data: fetchInfo, isLoading: isFetchingInfo, error: fetchingInfoError } = useFetchInfo();

	if (isLoading) return <div>Loading...</div>;
	if (error) router.push("/auth");
	if (!apiUser) return <div></div>;

	if (isFetchingInfo) return <div>Loading...</div>;
	if (fetchingInfoError) return <div>{fetchingInfoError.message}</div>;

	const isAdmin = fetchInfo?.admins.usernames.includes(apiUser.user_metadata.full_name);

	return (
		<main className={"flex flex-wrap h-[100vh] bg-pallete1"}>
			<div className="w-[50%]">
				<Player user={apiUser} fetchInfo={fetchInfo} isAdmin={isAdmin} />
				<Queue user={apiUser} fetchInfo={fetchInfo} isAdmin={isAdmin} />
			</div>
			<div className="w-[50%]">
				<UserSection user={apiUser} fetchInfo={fetchInfo} isAdmin={isAdmin} />
			</div>
		</main>
	);
}
