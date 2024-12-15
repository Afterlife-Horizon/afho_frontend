import useLevels from "hooks/useLevels"
import { Avatar, AvatarFallback } from "components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import parseRank from "functions/parseRank"
import Spinner from "components/ui/Spinner"
import React from "react"
import { User } from "lucide-react"
import ScrollDiv from "components/ui/ScrollDiv"
import { defaultProps } from "types"

const Levels: React.FC<defaultProps> = () => {
	const { data: levels, isLoading, error } = useLevels()

	if (isLoading)
		return (
			<div className="h-[calc(100dvh-2rem-10rem-4rem)]">
				<Spinner size={150} />
			</div>
		)
	if (error) return <div>Error: {error.message}</div>
	if (!levels) return <div></div>

	const filteredLevels = levels.filter(level => level.user && level.user.displayAvatarURL)

	return (
		<ScrollDiv className="flex max-h-[calc(100dvh-2rem-10rem-4rem)] flex-col gap-3 rounded-b-lg">
			<table className="w-full p-[5rem]">
				<thead>
					<tr className="sticky top-0 z-10 bg-background-light [&>*]:px-[0.5rem]">
						<th className="mt-0 text-right ">Rank</th>
						<th className="text-start">Username</th>
						<th className="text-start">Level</th>
						<th className="text-start">Xp</th>
					</tr>
				</thead>
				<tbody>
					{filteredLevels.map((level, index) => {
						return (
							<tr
								key={level.user.userId}
								className={`h-[4rem] font-medium ${index % 2 == 0 ? "bg-background-medium" : "bg-background-light"}`}
							>
								<td className="pr-[1rem] text-right">
									{index + 1}
									{parseRank(index + 1)}
								</td>
								<td>
									<div className="flex h-full w-full flex-row items-center gap-5">
										{level.user.displayAvatarURL ? (
											<Avatar>
												<AvatarImage className="select-none" draggable={false} src={level.user.displayAvatarURL} />
												<AvatarFallback>
													<User />
												</AvatarFallback>
											</Avatar>
										) : null}
										<div>{level.user.displayName}</div>
									</div>
								</td>
								<td>{level.lvl}</td>
								<td>{level.xp}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</ScrollDiv>
	)
}

export default Levels
