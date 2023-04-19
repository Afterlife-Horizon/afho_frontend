import { UseQueryResult, useQuery } from "@tanstack/react-query";
import getUserFavorites from "@/functions/getUserFavorites";

const useFavorites = (id: string): UseQueryResult<fav[], Error> => {
	return useQuery({
		enabled: !!id && id !== "",
		queryKey: ["favorites", id],
		queryFn: () => getUserFavorites(),
		select: (data) => data.favorites,
	});
};

export default useFavorites;
