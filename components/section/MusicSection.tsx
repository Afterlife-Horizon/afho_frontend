import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import React from "react";
import Favorites from "./musicSection/Favorites";
import Filters from "./musicSection/Filters";
import Queue from "./musicSection/Queue";

const MusicSection: React.FC<defaultProps> = (props) => {
    const { isAdmin } = props
    return ( 
        <section
            className={`grid grid-rows-[4rem_auto] xl:grid-rows-[5rem_auto] w-full mx-auto shadow bg-pallete2 rounded-lg text-white max-h-[calc(100vh-3.2rem-20rem)]`}
        >
            <Tabs defaultValue="queue" className="h-[calc(100vh-2rem-21rem)] max-h-[calc(100vh-2rem-21rem)]">
				<TabsList
					className={`w-full md:rounded-none p[0.5rem] gap-1 md:gap-3 md:p-[2rem] h-[4rem] bg-pallete2 [&>*:hover]:bg-accent1 text-white`}
				>
					<TabsTrigger value="queue" className="w-full data-[state=active]:bg-accent2 data-[state=active]:text-white">
						Queue
					</TabsTrigger>
					<TabsTrigger value="favorites" className="w-full data-[state=active]:bg-accent2 data-[state=active]:text-white">
						Favorites
                    </TabsTrigger>
                    {isAdmin ? (
						<TabsTrigger value="filters" className="w-full data-[state=active]:bg-accent2 data-[state=active]:text-white">
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