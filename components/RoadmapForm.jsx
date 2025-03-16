'use client'
import { useActionState, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Slider } from './ui/slider'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { CommunityCardSkeleton } from './CommunityCard'
import RoadmapTimeline from './RoadMap'
import ProfileAnalysisSkeleton from './SkeletonProfile'
import RoadmapTimelineSkeleton from './RoadmapSkeleton'

const RoadmapForm = () => {

    const [errors, setErrors] = useState({})
    const [experienceLevel, setExperienceLevel] = useState("")
    const [days, setDays] = useState(30)
    const [isRoadmap, setIsRoadMap] = useState(false)
    const [error, setError] = useState(null)
    const [roadmapData, setRoadmapData] = useState(null)

    const getRoadmap = async (prevData, formData) => {
        try {
            // Reset previous state
            setError(null)
            setIsRoadMap(false)

            // Make a direct fetch request instead of using useCompletion
            const response = await fetch("/api/gemini/roadmap", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ skill: formData.get("skill"), experience: experienceLevel, days }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Failed to generate analysis")
            }

            const data = await response.json()

            // Check if there's an error in the response
            if (data.error) {
                throw new Error(data.error)
            }
            setRoadmapData(data.roadmap)
            setIsRoadMap(true)
        } catch (err) {
            console.error("Analysis error:", err)
            setError(err instanceof Error ? err.message : "An error occurred during analysis")
        }
    }

    const [state, formAction, isPending] = useActionState(getRoadmap, { error: "", status: "INITIAL" });
    return (
        <div>
            <form action={formAction} className='startup-form'  >
                <div>
                    <label htmlFor="skill" className='startup-form_label' > What roadmap are you seeking? </label>
                    <Input id="skill" name="skill" required className='startup-form_input' placeholder="e.g. Web Development, Data Structures & Algorithms" />
                    <p> Enter the skill or technology you want to learn. </p>
                    {errors.skill && <p className='startup-form_error'> {errors.skill} </p>}
                </div>

                <div>
                    <label htmlFor="description" className='startup-form_label' > Experience Level </label>
                    <Select onValueChange={(val) => setExperienceLevel(val)} value={experienceLevel} >
                        <SelectTrigger className="startup-form_select" >
                            <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent className="select_content" >
                            <SelectItem className="select_item" value="beginner">Beginner</SelectItem>
                            <SelectItem className="select_item" value="early">Early Stage</SelectItem>
                            <SelectItem className="select_item" value="intermediate">Intermediate</SelectItem>
                            <SelectItem className="select_item" value="expert">Expert</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label htmlFor="category" className='startup-form_label' > Category </label>
                    <div className='flex gap-2 items-center' >
                        <Input type="number" min={1} max={365} value={days || ""} onChange={(e) => { setDays(Number(e.target.value)) }} className="startup-form_input" placeholder="No of days.." />
                        <Slider min={1} max={365} step={1} value={[days]} onValueChange={(value) => setDays(value[0])} />
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{days} days</span>
                        </div>
                    </div>

                    <div> How long would you like your roadmap to be? </div>
                    {errors.category && <p className='startup-form_error'> {errors.category} </p>}
                </div>


                <Button type="submit" className="startup-form_btn text-bg-white" disbaled={isPending} >
                    {isPending ? <> <Loader2 className='animate-spin' /> Generating... </> : 'Generate A Roadmap'}

                </Button>
            </form>

            {isPending && <RoadmapTimelineSkeleton />}

            {error && <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>}

            {isRoadmap && <RoadmapTimeline roadmap={roadmapData} />}
        </div>
    )
}

export default RoadmapForm
