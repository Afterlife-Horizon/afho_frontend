import ScrollDiv from "components/ui/ScrollDiv"
import Spinner from "components/ui/Spinner"
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar"
import { Button } from "components/ui/button"
import parseRank from "functions/parseRank"
import useBrasilCounts from "hooks/useBrasilCounts"
import useConnectedMembers from "hooks/useConnectedMembers"
import { defaultProps } from "types"
import { supabase } from "utils/supabaseUtils"
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
			<div className="h-[calc(100dvh-2rem-10rem-4rem)]">
				<Spinner size={150} />
			</div>
		)
	if (error) return <div>Error: {error.message}</div>
	if (errorConnectedMembers) return <div>Error: {errorConnectedMembers.message}</div>
	if (brasils === undefined) return <div></div>

	const filteredBrasils = brasils === null ? [] : brasils.filter(brasil => brasil.user && brasil.user.displayAvatarURL)

	const memberNames = connectedMembers ? connectedMembers.map(m => m.username) : []

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function autocompleteCheckValue(option: any, newValue: any) {
		return option === newValue || newValue === ""
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function handleChangeCurrentPlayer(_event: any, values: any) {
		setCurrentPlayer(values)
		console.log(currentPlayer)
	}

	function handleBresilClicked() {
		async function bresilMember(id: string) {
			await axios
				.post(
					"/api/bresilMember",
					{ moverId: user?.user_metadata.provider_id, movedId: id },
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: (await supabase.auth.getSession()).data?.session?.access_token
						}
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
		console.log(currentPlayer, movedMemberId, connectedMembers, currentPlayer === "" || !movedMemberId)
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
			<div className="flex flex-row justify-between gap-3 p-3">
				<Autocomplete
					className="w-[78%]"
					disableClearable
					freeSolo
					disablePortal
					isOptionEqualToValue={autocompleteCheckValue}
					value={currentPlayer}
					options={memberNames}
					onChange={handleChangeCurrentPlayer}
					renderInput={params => <TextField className="h-[4rem] text-dark" {...params} variant="filled" label="Member" />}
				/>

				<Button className="h-[3.3rem] w-[30%] bg-accent-dark hover:bg-accent-light" onClick={handleBresilClicked}>
					{isMoving ? <Spinner size={30} /> : "Bresil"}
				</Button>
			</div>
			<ScrollDiv className="flex max-h-[calc(100dvh-2rem-10rem-9rem)] flex-col gap-3 rounded-b-lg">
				<table className="w-full p-[5rem]">
					<thead>
						<tr className="sticky top-0 z-10 bg-background-light [&>*]:px-[0.5rem]">
							<th className="mt-0 text-right ">Rank</th>
							<th className="text-start">Username</th>
							<th className="text-start">Count</th>
							<th className="text-start">Given</th>
						</tr>
					</thead>
					<tbody>
						{filteredBrasils.map((brasil, index) => (
							<tr
								key={brasil.user.userId}
								className={`h-[4rem] font-medium ${index % 2 == 0 ? "bg-background-medium" : "bg-background-light"}`}
							>
								<td className="pr-[1rem] text-right">
									{index + 1}
									{parseRank(index + 1)}
								</td>
								<td>
									<div className="flex h-full w-full flex-row items-center gap-5">
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
