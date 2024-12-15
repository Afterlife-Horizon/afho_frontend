import getAchievements from "functions/getAchievments"
import { APIAchievement } from "types"
import { UseQueryResult, useQuery } from "@tanstack/react-query"

const useAchievements = (): UseQueryResult<APIAchievement[], Error> => {
	return useQuery({
		queryKey: ["achievements", "all"],
		queryFn: () => getAchievements(),
		refetchInterval: 2000
	})
}

export default useAchievements
