import getConnectedMembers from "functions/getConnectedMembers"
import { UseQueryResult, useQuery } from "@tanstack/react-query"
import { user } from "types/discord"

const useConnectedMembers = (): UseQueryResult<user[], Error> => {
	return useQuery({
		queryKey: ["connectedMembers", "all"],
		queryFn: () => getConnectedMembers(),
		refetchInterval: 2000,
		select: data => data.data
	})
}

export default useConnectedMembers
