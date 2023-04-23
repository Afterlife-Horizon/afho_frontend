import { UseQueryResult, useQuery } from "@tanstack/react-query"
import { getUser } from "../lib/supabaseUtils"
import { User } from "@supabase/supabase-js"

const useUser = (): UseQueryResult<User, Error> => {
	return useQuery({
		queryKey: ["user"],
		queryFn: getUser,
		select: data => data.user,
		retry(failureCount, error) {
			if (error.message === "invalid claim: missing sub claim") {
				return false
			}
			if (failureCount < 2) {
				return true
			}
			return false
		}
	})
}

export default useUser
