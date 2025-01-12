import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getUser from "functions/GetUser"
import { APIUser } from "discord-api-types/v10"

const useUser = (jwt: string | null): UseQueryResult<APIUser, Error> => {
	return useQuery({
		queryKey: ["user"],
		queryFn: () => getUser(jwt),
		select: data => data.user,
		enabled: jwt !== null,
		retry(failureCount) {
			if (failureCount < 2) {
				return true
			}
			return false
		}
	})
}

export default useUser
