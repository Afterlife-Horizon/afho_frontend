import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import React from "react";
import Favorites from "./musicSection/Favorites";
import Filters from "./musicSection/Filters";
import Queue from "./musicSection/Queue";
import { defaultProps } from "@/types";

const MusicSection: React.FC<defaultProps> = (props) => {
    const { isAdmin } = props
    return ( 
        <section
            className={`grid grid-rows-[4rem_auto] xl:grid-rows-[5rem_auto] w-full mx-auto shadow bg-background-medium rounded-lg text-dark max-h-[calc(100vh-3.2rem-20rem)]`}
        >
            <Tabs defaultValue="queue" className="h-[calc(100vh-2rem-21rem)] max-h-[calc(100vh-2rem-21rem)]">
				<TabsList
					className={`w-full md:rounded-none p[0.5rem] gap-1 md:gap-3 md:p-[2rem] h-[4rem] bg-background-medium [&>*:hover]:bg-accent-light text-dark`}
				>
					<TabsTrigger value="queue" className="w-full data-[state=active]:bg-accent-dark data-[state=active]:text-dark">
						Queue
					</TabsTrigger>
					<TabsTrigger value="favorites" className="w-full data-[state=active]:bg-accent-dark data-[state=active]:text-dark">
						Favorites
                    </TabsTrigger>
                    {isAdmin ? (
						<TabsTrigger value="filters" className="w-full data-[state=active]:bg-accent-dark data-[state=active]:text-dark">
							Filters
						</TabsTrigger>
					) : null}
				</TabsList>
				<TabsContent value="queue" className="mt-0">
					<Queue {...props} />
				</TabsContent>
                <TabsContent value="favorites" className="mt-0">
					<Favorites {...props} />
				</TabsContent>
				{isAdmin ? (
					<TabsContent value="filters" className="mt-0">
						<Filters {...props} />
					</TabsContent>
				) : null}
            </Tabs>
        </section>
     );
}
 
export default MusicSection;