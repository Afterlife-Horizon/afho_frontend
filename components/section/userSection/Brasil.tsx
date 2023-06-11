import ScrollDiv from "@/components/ui/ScrollDiv"
import Spinner from "@/components/ui/Spinner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import parseRank from "@/functions/parseRank"
import useBrasilCounts from "@/hooks/useBrasilCounts"
import useConnectedMembers from "@/hooks/useConnectedMembers"
import { Autocomplete, TextField } from "@mui/material"
import axios, { AxiosError } from "axios"
import React, { useState } from "react"

const Brasil: React.FC<defaultProps> = ({ setToastColor, setToastDescription, setToastOpen, setToastTitle, user }) => {
	const { data: brasils, isLoading, error } = useBrasilCounts()
	const { data: connectedMembers, isLoading: isLoadingConnectedMembers, error: errorConnectedMembers } = useConnectedMembers()
	const [currentPlayer, setCurrentPlayer] = useState("")
	const [isMoving, setIsMoving] = useState(false)

	if (isLoading || isLoadingConnectedMembers)
		return (
			<div className="h-[calc(100vh-2rem-10rem-4rem)]">
				<Spinner size={150} />
			</div>
		)
	if (error) return <div>Error: {error.message}</div>
	if (errorConnectedMembers) return <div>Error: {errorConnectedMembers.message}</div>
	if (!brasils) return <div></div>

	const filteredBrasils = brasils.filter(brasil => brasil.user && brasil.user.displayAvatarURL)

	const memberNames = connectedMembers ? connectedMembers.map(m => m.username) : []

	function autocompleteCheckValue(option: any, newValue: any) {
		return option === newValue || newValue === ""
	}

	function handleChangeCurrentPlayer(_event: any, values: any) {
		setCurrentPlayer(values)
	}

	function handleBresilClicked() {
		async function bresilMember(id: string) {
			await axios
				.post(
					"/api/bresilMember",
					{ moverId: user?.user_metadata.provider_id, movedId: id },
					{
						headers: { "Content-Type": "application/json" }
					}
				)
				.then(() => {
					setIsMoving(false)
				})
				.catch((err: AxiosError) => {
					const data = err.response?.data as { error: string }
					setToastOpen(true)
					setToastTitle(`${err.response?.status} - ${err.response?.statusText}`)
					setToastDescription(data.error)
					setToastColor("destructive")
					setIsMoving(false)
				})
		}

		const movedMemberId = connectedMembers?.find(m => m.username === currentPlayer)?.id
		if (currentPlayer === "" || !movedMemberId) {
			setToastOpen(true)
			setToastTitle("")
			setToastDescription("Please select a member")
			setToastColor("inform")
			return
		}

		setIsMoving(true)
		bresilMember(movedMemberId)
	}

	return (
		<div className="grid grid-rows-[5rem_1fr]">
			<div className="flex flex-row gap-3 p-3 justify-between">
				<Autocomplete
					className="w-[78%]"
					disableClearable
					freeSolo
					disablePortal
					isOptionEqualToValue={autocompleteCheckValue}
					value={currentPlayer}
					options={memberNames}
					onChange={handleChangeCurrentPlayer}
					renderInput={params => <TextField className="h-[4rem] text-white" {...params} variant="filled" label="Member" />}
				/>

				<Button className="w-[30%] h-[3.3rem] bg-accent2 hover:bg-accent1" onClick={handleBresilClicked}>
					{isMoving ? <Spinner size={30} /> : "Bresil"}
				</Button>
			</div>
			<ScrollDiv className="flex flex-col gap-3 rounded-b-lg max-h-[calc(100vh-2rem-10rem-9rem)] ">
				<table className="w-full p-[5rem]">
					<thead>
						<tr className="[&>*]:px-[0.5rem] bg-pallete3 sticky top-0 z-10">
							<th className="text-right mt-0 ">Rank</th>
							<th className="text-start">Username</th>
							<th className="text-start">Count</th>
							<th className="text-start">Given</th>
						</tr>
					</thead>
					<tbody>
						{filteredBrasils.map((brasil, index) => (
							<tr key={brasil.user.userId} className={`h-[4rem] font-medium ${index % 2 == 0 ? "bg-pallete2" : "bg-pallete3"}`}>
								<td className="text-right pr-[1rem]">
									{index + 1}
									{parseRank(index + 1)}
								</td>
								<td>
									<div className="flex flex-row items-center gap-5 w-full h-full">
										{brasil.user.displayAvatarURL ? (
											<Avatar>
												<AvatarImage className="select-none" draggable={false} src={brasil.user.displayAvatarURL} />
												<AvatarFallback></AvatarFallback>
											</Avatar>
										) : null}
										<div>{brasil.user.displayName}</div>
									</div>
								</td>
								<td>{brasil.bresil_received}</td>
								<td>{brasil.bresil_sent}</td>
							</tr>
						))}
					</tbody>
				</table>
			</ScrollDiv>
		</div>
	)
}

export default Brasil
