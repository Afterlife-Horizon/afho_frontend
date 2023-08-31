import ScrollDiv from "@/components/ui/ScrollDiv";
import Spinner from "@/components/ui/Spinner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAchievements from "@/hooks/useAchievements";
import { defaultProps } from "@/types";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const Achievements: React.FC<defaultProps> = (props) => {
    const { } = props
    const [selectedMember, setSelectedMember] = React.useState<string>(props.user.user_metadata.full_name)
    const { data: achievements, isLoading, error } = useAchievements()

    const nonNullAchievements = achievements?.filter(achievement => achievement.achievements?.length > 0)
    const selectMemberList = nonNullAchievements?.map(achievement => achievement.username) || []

    if (props.user.user_metadata.full_name && !selectMemberList?.includes(props.user.user_metadata.full_name)) {
        nonNullAchievements?.push(
            {
                id: props.user.id,
                username: props.user.user_metadata.full_name,
                achievements: []
            }
        )
        selectMemberList?.push(props.user.user_metadata.full_name)
    }

    if (isLoading) return (
			<div className="h-[calc(100vh-2rem-10rem-4rem)]">
				<Spinner size={150} />
			</div>
		)
    if (error) return <div>error</div>

    function autocompleteCheckValue(option: any, newValue: any) {
		return option === newValue || newValue === ""
	}

    return (
        <div>
            <Autocomplete
					className="w-full"
					disableClearable
					freeSolo
					disablePortal
					isOptionEqualToValue={autocompleteCheckValue}
					value={selectedMember}
					options={selectMemberList}
					onChange={(event, newValue) =>  setSelectedMember(newValue)}
					renderInput={params => <TextField className="h-[4rem] text-dark" {...params} variant="filled" label="Member" />}
				/>
            <ScrollDiv className="flex flex-col gap-3 rounded-b-lg max-h-[calc(100vh-2rem-10rem-9rem)]">
                <table className="w-full p-[5rem]">
                    <thead>
                        <tr className="[&>*]:px-[1.5rem] bg-background-light sticky top-0 z-10">
                            <th className="text-start w-[30%] px-10">Type</th>
                            <th className="text-start">Current</th>
                            <th className="text-start">Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedMember && nonNullAchievements?.find(achievement => achievement.username === selectedMember)?.achievements?.map((achievement, index) => (
                            <tr key={achievement.name} className={`h-[4rem] font-medium ${index % 2 == 0 ? "bg-background-medium" : "bg-background-light"}`}>
                                <td className="px-10">{achievement.type.toUpperCase()}</td>
                                <td>{achievement.name}</td>
                                <td>
                                    {achievement.requirements} 
                                    {
                                        achievement.type === "TIME" ? " s" : 
                                        achievement.type === "MESSAGE" ? " xp" :
                                        achievement.type === "BrasilRecieved" ? " received" :
                                        achievement.type === "BrasilSent" ? " sent" : ""
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ScrollDiv>
        </div>
    );
}

export default Achievements;