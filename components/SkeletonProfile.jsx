import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Zap, Trophy, Lightbulb } from "lucide-react";

const ProfileAnalysisSkeleton = () => {
    return (
        <div className="space-y-6">
            {/* Student Profile Summary */}
            <Card className="overflow-hidden border shadow-sm">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>
                            <Skeleton className="h-6 w-40" />
                        </CardTitle>
                        <CardDescription>
                            <Skeleton className="h-4 w-60" />
                        </CardDescription>
                    </div>
                    <Users className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5 mt-2" />
                </CardContent>
            </Card>

            {/* Key Interest Clusters */}
            <Card className="overflow-hidden border shadow-sm">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>
                            <Skeleton className="h-6 w-40" />
                        </CardTitle>
                        <CardDescription>
                            <Skeleton className="h-4 w-60" />
                        </CardDescription>
                    </div>
                    <Zap className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-3">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-4 w-56" />
                    <Skeleton className="h-4 w-44" />
                </CardContent>
            </Card>

            {/* Personalized Recommendations */}
            <Card className="overflow-hidden border shadow-sm">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>
                            <Skeleton className="h-6 w-40" />
                        </CardTitle>
                        <CardDescription>
                            <Skeleton className="h-4 w-60" />
                        </CardDescription>
                    </div>
                    <Trophy className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </CardContent>
            </Card>

            {/* Engagement Strategies */}
            <Card className="overflow-hidden border shadow-sm">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>
                            <Skeleton className="h-6 w-40" />
                        </CardTitle>
                        <CardDescription>
                            <Skeleton className="h-4 w-60" />
                        </CardDescription>
                    </div>
                    <Lightbulb className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-3">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-4 w-56" />
                    <Skeleton className="h-4 w-44" />
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfileAnalysisSkeleton;
