import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import React from "react"
import Favorites from "./musicSection/Favorites"
import Filters from "./musicSection/Filters"
import Queue from "./musicSection/Queue"
import { defaultProps } from "types"

const MusicSection: React.FC<defaultProps> = props => {
	const { isAdmin } = props
	return (
		<section
			className={`mx-auto max-h-[calc(100dvh-3.2rem-20rem)] w-full grid-rows-[4rem_auto] rounded-lg bg-background-medium text-dark shadow xl:grid xl:grid-rows-[5rem_auto]`}
		>
			<Tabs defaultValue="queue" className="h-[calc(100dvh-2rem-21rem)] max-h-[calc(100dvh-2rem-21rem)]">
				<TabsList
					className={`p[0.5rem] h-[4rem] w-full gap-1 bg-background-medium text-dark md:gap-3 md:rounded-none md:p-[2rem] [&>*:hover]:bg-accent-light`}
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
	)
}

export default MusicSection
