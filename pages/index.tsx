import Player from "@/components/Player";
import Queue from "@/components/Queue";
import UserSection from "@/components/UserSection";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export default function Home() {
	return (
		<QueryClientProvider client={queryClient}>
			<main className={"flex flex-wrap h-[100vh] bg-pallete1"}>
				<div className="w-[50%]">
					<Player />
					<Queue />
				</div>
				<div className="w-[50%]">
					<UserSection />
				</div>
			</main>
		</QueryClientProvider>
	);
}
