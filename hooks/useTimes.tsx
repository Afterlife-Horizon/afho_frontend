import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getTimes from "@/functions/getTimes"
import { ITime } from "@/types"

const useTimes = (): UseQueryResult<ITime[], Error> => {
	return useQuery({
		queryKey: ["time", "all"],
		queryFn: () => getTimes(),
		refetchInterval: 5000
	})
}

export default useTimes
