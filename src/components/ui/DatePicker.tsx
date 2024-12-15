"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "lib/utils"
import { Button } from "components/ui/button"
import { Calendar } from "components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"

export function DatePickerWithConfirmButton({
	date,
	setDate,
	onConfirm,
	defaultMonth = new Date()
}: {
	date: Date | undefined
	setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
	onConfirm: () => void
	defaultMonth?: Date
}) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0 shadow">
				<div className="text-bold w-full text-center text-lg">Change birth date</div>
				<Calendar
					mode="single"
					captionLayout="dropdown"
					fromYear={1985}
					toYear={new Date().getFullYear()}
					selected={date}
					defaultMonth={defaultMonth}
					onSelect={setDate}
					disabled={date => date > new Date() || date < new Date("1900-01-01")}
					initialFocus
				/>
				<Button className="w-full" onClick={onConfirm}>
					Confirm
				</Button>
			</PopoverContent>
		</Popover>
	)
}
