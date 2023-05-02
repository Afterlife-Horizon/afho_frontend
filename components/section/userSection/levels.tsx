import useLevels from "@/hooks/useLevels"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import parseRank from "@/functions/parseRank"
import Spinner from "@/components/ui/Spinner"
import React from "react"
import { User } from "lucide-react"

const Levels: React.FC<defaultProps> = ({}) => {
	const { data: levels, isLoading, error } = useLevels()

	if (isLoading)
		return (
			<div className="h-[calc(100vh-2rem-10rem-4rem)]">
				<Spinner size={150} />
			</div>
		)
	if (error) return <div>Error: {error.message}</div>
	if (!levels) return <div></div>

	const filteredLevels = levels.filter(level => level.user && level.user.displayAvatarURL)

	return (
		<ScrollArea className="flex flex-col gap-3 rounded-b-lg max-h-[calc(100vh-2rem-10rem-4rem)]">
			<table className="w-full p-[5rem]">
				<thead>
					<tr className="[&>*]:px-[0.5rem] bg-pallete3 sticky top-0 z-10">
						<th className="text-right mt-0 ">Rank</th>
						<th className="text-start">Username</th>
						<th className="text-start">Level</th>
						<th className="text-start">Xp</th>
					</tr>
				</thead>
				<tbody>
					{filteredLevels.map((level, index) => {
						return (
							<tr key={level.user.userId} className={`h-[4rem] font-medium ${index % 2 == 0 ? "bg-pallete2" : "bg-pallete3"}`}>
								<td className="text-right pr-[1rem]">
									{index + 1}
									{parseRank(index + 1)}
								</td>
								<td>
									<div className="flex flex-row items-center gap-5 w-full h-full">
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
		</ScrollArea>
	)
}

export default Levels
