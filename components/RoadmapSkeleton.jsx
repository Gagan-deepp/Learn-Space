"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, BookOpen, Link, Rocket, CheckCircle, Calendar } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function RoadmapTimelineSkeleton() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header Skeleton */}
            <div className="text-center mb-12">
                <Skeleton className="h-8 w-64 mx-auto mb-3" />
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-4 w-3/4 mx-auto" />
            </div>

            {/* Timeline Skeleton */}
            <div className="relative">
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                
                {[...Array(3)].map((_, index) => (
                    <div key={index} className={`relative mb-12 flex flex-col md:items-center`}> 
                        {/* Timeline node skeleton */}
                        <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gray-300 z-10"></div>
                        
                        {/* Content card skeleton */}
                        <div className="ml-16 md:ml-0 md:w-1/2">
                            <Card className="overflow-hidden border-t-4 shadow-lg">
                                <CardContent className="p-0">
                                    <div className="p-4 flex justify-between items-center">
                                        <div>
                                            <Skeleton className="h-5 w-40 mb-2" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                        <Skeleton className="h-5 w-5" />
                                    </div>

                                    <div className="border-t p-4 space-y-4">
                                        <Skeleton className="h-4 w-32 mb-2" />
                                        <div className="flex flex-wrap gap-2">
                                            {[...Array(3)].map((_, i) => (
                                                <Skeleton key={i} className="h-6 w-16" />
                                            ))}
                                        </div>

                                        <Skeleton className="h-4 w-32 mb-2" />
                                        <ul className="space-y-1">
                                            {[...Array(2)].map((_, i) => (
                                                <Skeleton key={i} className="h-4 w-48" />
                                            ))}
                                        </ul>

                                        <Skeleton className="h-4 w-32 mb-2" />
                                        <Skeleton className="h-12 w-full rounded-md" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
