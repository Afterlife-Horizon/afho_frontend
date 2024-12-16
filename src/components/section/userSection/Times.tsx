import ScrollDiv from "components/ui/ScrollDiv"
import Spinner from "components/ui/Spinner"
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar"
import parseRank from "functions/parseRank"
import useTimes from "hooks/useTimes"
import { defaultProps } from "types"
import { User } from "lucide-react"
import React from "react"

const Times: React.FC<defaultProps> = () => {
	const { data: times, isLoading, error } = useTimes()

	if (isLoading)
		return (
			<div className="h-[calc(100dvh-2rem-10rem-4rem)]">
				<Spinner size={150} />
			</div>
		)
	if (error) return <div>Error: {error.message}</div>
	if (!times) return <div></div>

	const filteredTimes = times.filter(time => time.user && time.user.displayAvatarURL)

	return (
		<ScrollDiv className="flex max-h-[calc(100dvh-2rem-10rem-4rem)] flex-col gap-3 rounded-b-lg">
			<table className="w-full p-[5rem]">
				<thead>
					<tr className="sticky top-0 z-10 bg-background-light [&>*]:px-[0.5rem]">
						<th className="mt-0 text-right ">Rank</th>
						<th className="text-start">Username</th>
						<th className="text-start">Time spent</th>
					</tr>
				</thead>
				<tbody>
					{filteredTimes.map((time, index) => {
						const days = Math.floor(time.time_spent / 86400)
						const hours = Math.floor((time.time_spent % 86400) / 3600)
						const minutes = Math.floor(((time.time_spent % 86400) % 3600) / 60)
						return (
							<tr
								key={time.user.userId}
								className={`h-[4rem] font-medium ${index % 2 == 0 ? "bg-background-medium" : "bg-background-light"}`}
							>
								<td className="pr-[1rem] text-right">
									{index + 1}
									{parseRank(index + 1)}
								</td>
								<td>
									<div className="flex h-full w-full flex-row items-center gap-5">
										{time.user.displayAvatarURL ? (
											<Avatar>
												<AvatarImage className="select-none" draggable={false} src={time.user.displayAvatarURL} />
												<AvatarFallback>
													<User />
												</AvatarFallback>
											</Avatar>
										) : null}
										<div>{time.user.nickname}</div>
									</div>
								</td>
								<td>
									{time.time_spent > 86400
										? `${days}d ${hours}h ${minutes}m`
										: time.time_spent > 3600
											? `${hours}h ${minutes}m`
											: `${minutes}m`}
									{time.time_spent > 86400 ? (
										<>
											<br />
											<p className="text-gray-400">{`${days * 24 + hours}h ${minutes}m`}</p>
										</>
									) : (
										""
									)}
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</ScrollDiv>
	)
}

export default Times
