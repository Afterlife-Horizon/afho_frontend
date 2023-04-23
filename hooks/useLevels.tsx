import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getLevels from "@/functions/getLevels"

type userXp = { user: guildMember; xp: number; lvl: number }[]

const useLevels = (): UseQueryResult<userXp, Error> => {
	return useQuery({
		queryKey: ["levels", "all"],
		queryFn: () => getLevels(),
		refetchInterval: 5000
	})
}

export default useLevels
