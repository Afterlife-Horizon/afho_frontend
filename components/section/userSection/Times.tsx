import Spinner from "@/components/ui/Spinner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import parseRank from "@/functions/parseRank"
import useTimes from "@/hooks/useTimes"
import { User } from "lucide-react"
import React from "react"

const Times: React.FC<defaultProps> = ({}) => {
	const { data: times, isLoading, error } = useTimes()

	if (isLoading)
		return (
			<div className="h-[calc(100vh-2rem-10rem-4rem)]">
				<Spinner size={150} />
			</div>
		)
	if (error) return <div>Error: {error.message}</div>

	const filteredTimes = times.filter(time => time.user && time.user.displayAvatarURL)

	return (
		<ScrollArea className="flex flex-col gap-3 rounded-b-lg max-h-[calc(100vh-2rem-10rem-4rem)]">
			<table className="w-full p-[5rem]">
				<thead>
					<tr className="[&>*]:px-[0.5rem] bg-pallete3 sticky top-0 z-10">
						<th className="text-right mt-0 ">Rank</th>
						<th className="text-start">Username</th>
						<th className="text-start">Time spent</th>
					</tr>
				</thead>
				<tbody>
					{filteredTimes.map((time, index) => {
						const hours = Math.floor(time.time_spent / 3600)
						const minutes = Math.floor((time.time_spent % 3600) / 60)
						return (
							<tr key={time.user.userId} className={`h-[4rem] font-medium ${index % 2 == 0 ? "bg-pallete2" : "bg-pallete3"}`}>
								<td className="text-right pr-[1rem]">
									{index + 1}
									{parseRank(index + 1)}
								</td>
								<td>
									<div className="flex flex-row items-center gap-5 w-full h-full">
										{time.user.displayAvatarURL ? (
											<Avatar>
												<AvatarImage className="select-none" draggable={false} src={time.user.displayAvatarURL} />
												<AvatarFallback>
													<User />
												</AvatarFallback>
											</Avatar>
										) : null}
										<div>{time.user.displayName}</div>
									</div>
								</td>
								<td>{time.time_spent > 3599 ? hours + "h " + minutes + "m " : minutes + "m "}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</ScrollArea>
	)
}

export default Times
