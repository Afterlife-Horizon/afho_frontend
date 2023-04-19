import { UseQueryResult, useQuery } from "@tanstack/react-query";
import getBrasilCounts from "@/functions/getBrasilCounts";

type COUNTS = { user: guildMember; bresil_received: number; bresil_sent: number }[];

const useBrasilCounts = (): UseQueryResult<COUNTS, Error> => {
	return useQuery({
		queryKey: ["bresil", "all"],
		queryFn: () => getBrasilCounts(),
		refetchInterval: 2000,
	});
};

export default useBrasilCounts;
