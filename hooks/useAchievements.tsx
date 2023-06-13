import getAchievements from "@/functions/getAchievments"
import { UseQueryResult, useQuery } from "@tanstack/react-query"

const useAchievements = (): UseQueryResult<Achievement[], Error> => {
    return useQuery({
        queryKey: ["achievements", "all"],
        queryFn: () => getAchievements(),
        refetchInterval: 2000
    })
}

export default useAchievements
