import useBrasilCounts from "@/hooks/useBrasilCounts";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import useConnectedMembers from "@/hooks/useConnectedMembers";
import { Button } from "./ui/button";
import parseRank from "@/functions/parseRank";
import Spinner from "./ui/Spinner";
import axios, { AxiosError } from "axios";

const Brasil: React.FC<defaultProps> = ({ setToastColor, setToastDescription, setToastOpen, setToastTitle, user }) => {
	const { data: brasils, isLoading, error } = useBrasilCounts();
	const { data: connectedMembers, isLoading: isLoadingConnectedMembers, error: errorConnectedMembers } = useConnectedMembers();
	const [currentPlayer, setCurrentPlayer] = useState("");
	const [isMoving, setIsMoving] = useState(false);

	if (isLoading || isLoadingConnectedMembers) return <Spinner size={150} />;
	if (error) return <div>Error: {error.message}</div>;
	if (errorConnectedMembers) return <div>Error: {errorConnectedMembers.message}</div>;
	if (!brasils) return <div></div>;

	const memberNames = connectedMembers ? connectedMembers.map((m) => m.username) : [];

	function autocompleteCheckValue(option: any, newValue: any) {
		return option === newValue || newValue === "";
	}

	function handleChangeCurrentPlayer(event: any, values: any) {
		setCurrentPlayer(values);
	}

	function handleBresilClicked() {
		async function bresilMember(id: string) {
			await axios
				.post(
					"/api/bresilMember",
					{ moverId: user?.user_metadata.provider_id, movedId: id },
					{
						headers: { "Content-Type": "application/json" },
					}
				)
				.catch((err: AxiosError) => {
					const data = err.response?.data as { error: string };
					setToastOpen(true);
					setToastTitle(`${err.response?.status} - ${err.response?.statusText}`);
					setToastDescription(data.error);
					setToastColor("destructive");
				});
		}

		const movedMemberId = connectedMembers?.find((m) => m.username === currentPlayer)?.id;
		if (currentPlayer === "" || !movedMemberId) {
			setToastOpen(true);
			setToastTitle("");
			setToastDescription("Please select a member");
			setToastColor("inform");
			return;
		}

		setIsMoving(true);
		bresilMember(movedMemberId);
		setIsMoving(false);
	}

	return (
		<>
			<div className="flex flex-row gap-3 p-3 justify-between">
				<Autocomplete
					className="w-[78%]"
					sx={{
						"& .MuiAutocomplete-inputRoot": {
							color: "white",
							backgroundColor: "rgba(255,255,255,0.1)",
						},
						"& .MuiAutocomplete-popper": {
							backgroundColor: "rgba(255,255,255,0.1)",
						},
						"& .MuiAutocomplete-option": {
							color: "white",
						},
						"& .MuiAutocomplete-option[data-focus='true']": {
							backgroundColor: "rgba(255,255,255,0.1)",
						},
						"& .MuiAutocomplete-option[data-selected='true']": {
							backgroundColor: "rgba(255,255,255,0.1)",
						},
						"& .MuiAutocomplete-input": {
							color: "white",
						},
					}}
					disableClearable
					freeSolo
					disablePortal
					isOptionEqualToValue={autocompleteCheckValue}
					value={currentPlayer}
					options={memberNames}
					onChange={handleChangeCurrentPlayer}
					renderInput={(params) => (
						<TextField
							className="h-[4rem] text-white"
							{...params}
							sx={{
								"& .MuiFormLabel-root": {
									color: "white",
								},
							}}
							variant="filled"
							label="Member"
						/>
					)}
				/>

				
				<Button className="w-[30%] h-[3.3rem] bg-accent2 hover:bg-accent1" onClick={handleBresilClicked}>
					{isMoving ? <Spinner size={30} /> : "Bresil"}
				</Button>
			</div>
			<ScrollArea className="flex flex-col gap-3 max-h-[74vh]">
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
						{brasils.map((brasil, index) => (
							<tr key={brasil.user.userId} className={`h-[4rem] font-medium ${index % 2 == 0 ? "bg-pallete2" : "bg-pallete3"}`}>
								<td className="text-right pr-[1rem]">
									{index + 1}
									{parseRank(index + 1)}
								</td>
								<td>
									<div className="flex flex-row items-center gap-5 w-full h-full">
										{brasil.user.displayAvatarURL ? (
											<Avatar>
												<AvatarImage src={brasil.user.displayAvatarURL} />
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
			</ScrollArea>
		</>
	);
};

export default Brasil;
