import Spinner from "@/components/ui/Spinner";
import useAchievements from "@/hooks/useAchievements";
import React from "react";

const Achievements: React.FC<defaultProps> = (props) => {
    const { } = props
    const { data: achievements, isLoading, error } = useAchievements()

    if (isLoading) return (
			<div className="h-[calc(100vh-2rem-10rem-4rem)]">
				<Spinner size={150} />
			</div>
		)
    if (error) return <div>error</div>

    return (<div>
        {achievements.map((achievement, index) => {
            return <div key={index}>
                <h1>{achievement.currentTitle}</h1>
            </div>
        })}
    </div> );
}
 
export default Achievements;