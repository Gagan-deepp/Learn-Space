"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, BookOpen, Link, Rocket, CheckCircle, Calendar } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const getPhaseColor = (index, total) => {
    const colorPalettes = [
        // Teal to Blue
        ["#0ea5e9", "#0284c7", "#0369a1"],
        // Purple to Pink
        ["#a855f7", "#9333ea", "#7e22ce"],
        // Orange to Red
        ["#f97316", "#ea580c", "#c2410c"],
        // Green to Emerald
        ["#22c55e", "#16a34a", "#15803d"],
        // Rose to Pink
        ["#f43f5e", "#e11d48", "#be123c"],
    ]

    // Select a palette based on the total number of phases
    const paletteIndex = index % colorPalettes.length
    const palette = colorPalettes[paletteIndex]

    // Return the color from the palette
    return palette[0]
}

// Function to get the appropriate icon for each phase
const getPhaseIcon = (phase) => {
    if (phase.includes("Concepts") || phase.includes("Basics") || phase.includes("Fundamentals")) {
        return <BookOpen className="h-5 w-5" />
    } else if (phase.includes("Integration") || phase.includes("Web")) {
        return <Link className="h-5 w-5" />
    } else if (phase.includes("Deployment") || phase.includes("Optimization")) {
        return <Rocket className="h-5 w-5" />
    } else {
        // Default icon
        return <CheckCircle className="h-5 w-5" />
    }
}

export default function RoadmapTimeline({ roadmap }) {

    const [expandedPhases, setExpandedPhases] = useState([])

    const togglePhase = (index) => {
        setExpandedPhases((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
    }


    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{roadmap.skill} Roadmap</h1>
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Badge variant="outline" className="text-sm py-1 px-3 capitalize">
                        {roadmap.experienceLevel}
                    </Badge>
                    <Badge variant="outline" className="text-sm py-1 px-3 flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {roadmap.totalDays} days
                    </Badge>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">{roadmap.summary}</p>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-grey-1 via-grey-1 to-grey-1"></div>

                {roadmap.timeline.map((phase, index) => {
                    const isExpanded = expandedPhases.includes(index)
                    const phaseColor = getPhaseColor(index, roadmap.timeline.length)
                    const isEven = index % 2 === 0

                    return (
                        <div
                            key={index}
                            className={`relative mb-12 ${isEven ? "md:flex-row" : "md:flex-row-reverse"} flex flex-col md:items-center`}
                        >
                            {/* Timeline node */}
                            <div
                                className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 border-background z-10 flex items-center justify-center"
                                style={{ backgroundColor: phaseColor }}
                            >
                                {getPhaseIcon(phase.phase)}
                            </div>

                            {/* Content card */}
                            <div className={`ml-16 md:ml-0 ${isEven ? "md:mr-8 md:pr-8" : "md:ml-8 md:pl-8"} md:w-1/2`}>
                                <Card className="overflow-hidden border-t-4 shadow-lg" style={{ borderTopColor: phaseColor }}>
                                    <CardContent className="p-0">
                                        <div
                                            className="p-4 cursor-pointer flex justify-between items-center"
                                            onClick={() => togglePhase(index)}
                                        >
                                            <div>
                                                <h3 className="font-bold text-lg">{phase.phase}</h3>
                                                <p className="text-sm text-muted-foreground">Days {phase.days}</p>
                                            </div>
                                            <Button variant="ghost" size="icon">
                                                {isExpanded ? <ChevronUp /> : <ChevronDown />}
                                            </Button>
                                        </div>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="border-t"
                                                >
                                                    <div className="p-4 space-y-4">
                                                        {/* Topics */}
                                                        <div>
                                                            <h4 className="font-semibold mb-2">Topics</h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {phase.topics.map((topic, i) => (
                                                                    <Badge key={i} variant="secondary" className="py-1">
                                                                        {topic}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Resources */}
                                                        <div>
                                                            <h4 className="font-semibold mb-2">Resources</h4>
                                                            <ul className="list-disc list-inside text-sm space-y-1">
                                                                {phase.resources.map((resource, i) => (
                                                                    <li key={i}>{resource}</li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* Milestone */}
                                                        <div>
                                                            <h4 className="font-semibold mb-2">Milestone</h4>
                                                            <p className="text-sm bg-muted p-2 rounded-md">{phase.milestone}</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

