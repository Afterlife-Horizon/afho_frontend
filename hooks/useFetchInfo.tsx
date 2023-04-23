import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getBotInfo from "@/functions/getBotInfo"

const useFetchInfo = (): UseQueryResult<IFetchData, Error> => {
	return useQuery({
		queryKey: ["fetchInfo"],
		queryFn: getBotInfo,
		refetchInterval: 1000
	})
}

export default useFetchInfo
