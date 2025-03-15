"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { LoaderIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, BookOpen, Briefcase, CircleUser, Lightbulb, Trophy, Users, Zap } from "lucide-react"
import ProfileAnalysisSkeleton from "./SkeletonProfile"

const ProfileAnalysis = ({ user, communities }) => {
    const [analysis, setAnalysis] = useState(null)
    const [cacheAnalysis, setCacheAnalysis] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleAnalysisRequest = async () => {
        try {
            // Reset previous state
            setAnalysis(null)
            setError(null)
            setIsLoading(true)

            // Make a direct fetch request instead of using useCompletion
            const response = await fetch("/api/gemini/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user, communities }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Failed to generate analysis")
            }

            const data = await response.json()

            // Check if there's an error in the response
            console.log("DAta ==> ", data.analysis)
            if (data.error) {
                throw new Error(data.error)
            }
            setAnalysis(data?.analysis)
            setCacheAnalysis(data?.analysis)
        } catch (err) {
            console.error("Analysis error:", err)
            setError(err instanceof Error ? err.message : "An error occurred during analysis")
        } finally {
            setIsLoading(false)
        }
    }

    const colorPalette = [
        { bg: "bg-primary/10", text: "text-primary", icon: "text-primary" },
        { bg: "bg-secondary/20", text: "text-secondary-foreground", icon: "text-secondary" },
        { bg: "bg-blue-500/10 dark:bg-blue-500/20", text: "text-blue-700 dark:text-blue-300", icon: "text-blue-500" },
        {
            bg: "bg-purple-500/10 dark:bg-purple-500/20",
            text: "text-purple-700 dark:text-purple-300",
            icon: "text-purple-500",
        },
        { bg: "bg-amber-500/10 dark:bg-amber-500/20", text: "text-amber-700 dark:text-amber-300", icon: "text-amber-500" },
        {
            bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
            text: "text-emerald-700 dark:text-emerald-300",
            icon: "text-emerald-500",
        },
        { bg: "bg-rose-500/10 dark:bg-rose-500/20", text: "text-rose-700 dark:text-rose-300", icon: "text-rose-500" },
    ]

    const getColorByIndex = (index) => {
        return colorPalette[index % colorPalette.length]
    }

    // Get icon based on index for variety
    const getIconByIndex = (index) => {
        const icons = [
            <Zap key="zap" className="h-5 w-5" />,
            <BookOpen key="book" className="h-5 w-5" />,
            <Briefcase key="briefcase" className="h-5 w-5" />,
            <Lightbulb key="lightbulb" className="h-5 w-5" />,
            <CircleUser key="user" className="h-5 w-5" />,
            <Trophy key="trophy" className="h-5 w-5" />,
        ]
        return icons[index % icons.length]
    }

    useEffect(() => {
        if (!cacheAnalysis) {
            handleAnalysisRequest()
        }
        setAnalysis(cacheAnalysis)
    }, [])

    return (
        <div className="space-y-4">

            {error && <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>}

            {isLoading && <ProfileAnalysisSkeleton />}
            {analysis && <div className="space-y-6 p-4">
                {/* Summary Card */}
                <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Student Profile Summary</CardTitle>
                            <CardDescription>Overview of interests and recommendations</CardDescription>
                        </div>
                        <Users className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">{analysis.summaryText}</p>
                    </CardContent>
                </Card>

                {/* Key Interest Clusters */}
                <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Key Interest Clusters</CardTitle>
                            <CardDescription>Main areas of interest and related communities</CardDescription>
                        </div>
                        <Zap className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {analysis.keyInterestClusters.map((cluster, index) => {
                                const color = getColorByIndex(index)
                                return (
                                    <div key={index} className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div className={`rounded-full p-1.5 ${color.bg}`}>
                                                <div className={color.icon}>{getIconByIndex(index)}</div>
                                            </div>
                                            <h3 className="text-base font-semibold">{cluster.category}</h3>
                                        </div>
                                        <div className="grid gap-3 pl-9">
                                            {cluster.communities.map((community, cIndex) => {
                                                const communityColor = getColorByIndex(index + cIndex + 1)
                                                return (
                                                    <div key={cIndex} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                                                        <div>
                                                            <p className="font-medium text-sm">{community.name}</p>
                                                            <Badge className={`mt-1.5 ${communityColor.bg} ${communityColor.text}`} variant="outline">
                                                                {community.category}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Personalized Recommendations</CardTitle>
                            <CardDescription>Suggested activities based on your interests</CardDescription>
                        </div>
                        <Trophy className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {analysis.recommendations.map((recommendation, index) => {
                                const color = getColorByIndex(index + 2)
                                return (
                                    <Card key={index} className="overflow-hidden border-0 shadow-sm">
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-center">
                                                <CardTitle className="text-base">{recommendation.name}</CardTitle>
                                                <div className={color.icon}>{getIconByIndex(index + 2)}</div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <Badge className={`${color.bg} ${color.text}`}>{recommendation.category}</Badge>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Engagement Strategies */}
                <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Engagement Strategies</CardTitle>
                            <CardDescription>Activities to enhance your profile</CardDescription>
                        </div>
                        <Lightbulb className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {analysis.engagementStrategies.map((strategy, index) => {
                                const color = getColorByIndex(index + 3)
                                return (
                                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg border">
                                        <div className={`rounded-full p-2 ${color.bg}`}>
                                            <div className={color.icon}>
                                                <Lightbulb className="h-5 w-5" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{strategy.title}</h3>
                                            <Badge variant="outline" className={`mt-2 ${color.bg} ${color.text}`}>
                                                {strategy.type}
                                            </Badge>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Leadership Opportunities */}
                <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Leadership Opportunities</CardTitle>
                            <CardDescription>Recommended leadership roles</CardDescription>
                        </div>
                        <Award className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {analysis.leadershipOpportunities.map((opportunity, index) => {
                                const color = getColorByIndex(index + 4)
                                return (
                                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                                        <div className={`rounded-full p-2 ${color.bg}`}>
                                            <div className={color.icon}>
                                                <Award className="h-5 w-5" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-medium">{opportunity}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>}
        </div>
    )
}

export default ProfileAnalysis

