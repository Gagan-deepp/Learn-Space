import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <section className="section_container !w-[90%] !py-4">
            {/* NAME AND BACKGROUND IMAGE OF COMMUNITY - SKELETON */}
            <div className="flex flex-col sm:flex-row justify-between mt-10 w-full gap-8">
                <div className="flex flex-col gap-8">
                    <div>
                        {/* Title and description skeletons */}
                        <Skeleton className="h-9 w-[250px] mb-2" />
                        <Skeleton className="h-5 w-[350px]" />
                    </div>

                    <div className="flex items-start gap-5 flex-col">
                        {/* Author info skeleton */}
                        <div className="flex gap-2 items-center mb-3">
                            <Skeleton className="w-[56px] h-[56px] rounded-full" />
                            <div>
                                <Skeleton className="h-6 w-[150px] mb-1" />
                                <Skeleton className="h-5 w-[100px]" />
                            </div>
                        </div>

                        {/* Category tag skeleton */}
                        <Skeleton className="h-8 w-[100px] rounded-full" />

                        {/* Join button skeleton */}
                        <Skeleton className="h-10 w-[150px] rounded-md" />
                    </div>
                </div>

                {/* Background image skeleton */}
                <Skeleton className="w-full min-h-[350px] sm:w-[540px] sm:h-[360px] rounded-xl" />
            </div>

            {/* TABS SKELETON */}
            <div className="mt-8 max-w-5xl mx-auto">
                <div className="flex gap-4 mb-4">
                    <Skeleton className="h-10 w-[100px] rounded-md" />
                    <Skeleton className="h-10 w-[100px] rounded-md" />
                </div>

                {/* Tab content skeleton */}
                <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[80%]" />
                </div>
            </div>

        </section>
    )
}
