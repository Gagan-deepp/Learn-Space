"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileDown } from "lucide-react"
import * as XLSX from "xlsx"
import { toast } from "sonner"


export function HolidayCalendar() {
    const [holidays, setHolidays] = useState([])
    const [isUploaded, setIsUploaded] = useState(false)
    const [error, setError] = useState(null)
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())


    const handleFileUpload = (event) => {
        const file = event.target.files?.[0]
        if (!file) return

        // Check if file is an Excel file
        if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
            setError("Please upload an Excel file (.xlsx or .xls)")
            return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target?.result)
                const workbook = XLSX.read(data, { type: "array" })

                // Assuming the first sheet contains the holiday data
                const firstSheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[firstSheetName]

                // Convert to JSON
                const jsonData = XLSX.utils.sheet_to_json(worksheet)

                // Process the data
                const parsedHolidays = jsonData
                    .map((row) => {
                        // Try different date formats
                        let dateObj = null

                        if (row.Date) {
                            if (typeof row.Date === "string") {
                                // Try parsing as string date
                                dateObj = new Date(row.Date)
                            } else if (typeof row.Date === "number") {
                                // Handle Excel serial date
                                dateObj = new Date(Math.round((row.Date - 25569) * 86400 * 1000))
                            }
                        }

                        // Skip invalid dates
                        if (!dateObj || isNaN(dateObj.getTime())) {
                            return null
                        }

                        return {
                            date: dateObj,
                            description: row.Description || "Holiday",
                        }
                    })
                    .filter(Boolean)

                if (parsedHolidays.length === 0) {
                    setError("No valid holiday dates found in the Excel file")
                    return
                }

                setHolidays(parsedHolidays)
                setIsUploaded(true)
                setError(null)
                toast.success("File analysed successfully")
            } catch (err) {
                console.error("Error parsing Excel file:", err)
                toast.error("Error while parsing file")
                setError("Failed to parse the Excel file. Please check the format.")
            }
        }

        reader.readAsArrayBuffer(file)
    }

    // Navigation functions
    const goToPreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
        } else {
            setCurrentMonth(currentMonth - 1)
        }
    }

    const goToNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
        } else {
            setCurrentMonth(currentMonth + 1)
        }
    }

    // Get days in month
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate()
    }

    // Get first day of month (0 = Sunday, 1 = Monday, etc.)
    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay()
    }

    // Check if a date is a holiday
    const isHoliday = (year, month, day) => {
        return holidays.some(
            (holiday) =>
                holiday.date.getFullYear() === year && holiday.date.getMonth() === month && holiday.date.getDate() === day,
        )
    }

    // Get holiday description
    const getHolidayDescription = (year, month, day) => {
        const holiday = holidays.find(
            (holiday) =>
                holiday.date.getFullYear() === year && holiday.date.getMonth() === month && holiday.date.getDate() === day,
        )
        return holiday ? holiday.description : ""
    }

    // Generate calendar
    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentYear, currentMonth)
        const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)

        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ]

        const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

        // Calculate previous month days to display
        const prevMonthDays = []
        if (firstDayOfMonth > 0) {
            const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
            const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
            const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth)

            for (let i = firstDayOfMonth - 1; i >= 0; i--) {
                prevMonthDays.push({
                    day: daysInPrevMonth - i,
                    month: prevMonth,
                    year: prevMonthYear,
                    isCurrentMonth: false,
                })
            }
        }

        // Current month days
        const currentMonthDays = []
        for (let i = 1; i <= daysInMonth; i++) {
            currentMonthDays.push({
                day: i,
                month: currentMonth,
                year: currentYear,
                isCurrentMonth: true,
            })
        }

        // Next month days to fill the calendar
        const nextMonthDays = []
        const totalDaysShown = prevMonthDays.length + currentMonthDays.length
        const remainingCells = 42 - totalDaysShown // 6 rows of 7 days

        if (remainingCells > 0) {
            const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
            const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear

            for (let i = 1; i <= remainingCells; i++) {
                nextMonthDays.push({
                    day: i,
                    month: nextMonth,
                    year: nextMonthYear,
                    isCurrentMonth: false,
                })
            }
        }

        const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]

        return (
            <div className="w-full max-w-md mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <Button variant="outline" onClick={goToPreviousMonth}>
                        &lt;
                    </Button>
                    <h2 className="text-xl font-bold">
                        {monthNames[currentMonth]} {currentYear}
                    </h2>
                    <Button variant="outline" onClick={goToNextMonth}>
                        &gt;
                    </Button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map((day) => (
                        <div key={day} className="text-center font-medium text-sm py-1">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {allDays.map((day, index) => {
                        const isHolidayDay = isHoliday(day.year, day.month, day.day)
                        const holidayDesc = isHolidayDay ? getHolidayDescription(day.year, day.month, day.day) : ""

                        return (
                            <div
                                key={index}
                                className={`
                  relative h-12 border rounded-md flex flex-col items-center justify-start p-1
                  ${!day.isCurrentMonth ? "text-gray-400 bg-gray-50" : ""}
                  ${isHolidayDay ? "bg-red-100 border-red-300" : ""}
                  ${new Date().getDate() === day.day &&
                                        new Date().getMonth() === day.month &&
                                        new Date().getFullYear() === day.year
                                        ? "border-blue-500 border-2"
                                        : ""
                                    }
                `}
                                title={holidayDesc}
                            >
                                <span className="text-sm">{day.day}</span>
                                {isHolidayDay && (
                                    <div className="absolute bottom-0 left-0 right-0 text-[7px] text-center truncate px-1 text-red-600 font-medium">
                                        {holidayDesc.length > 10 ? holidayDesc.substring(0, 10) + "..." : holidayDesc}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-6">
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-4">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center space-y-6">
                            <div className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="file-upload"
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">Excel file (.xlsx, .xls)</p>
                                    </div>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        accept=".xlsx, .xls"
                                        onChange={handleFileUpload}
                                    />
                                </label>
                            </div>

                            {error && (
                                <div className="border-2 border-red-400 text-red-200 rounded-xl">
                                    <div>{error}</div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="p-4">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-semibold mb-4">School Holiday Calendar</h2>
                            {renderCalendar()}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
