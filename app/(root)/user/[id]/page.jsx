import { auth } from '@/auth';
import { CommunityCardSkeleton } from '@/components/CommunityCard';
import { HolidayCalendar } from '@/components/Holiday_Calendar';
import ProfileAnalysis from '@/components/ProfileAnalysis';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserCommunity from '@/components/UserCommunity';
import { client } from '@/sanity/lib/client';
import { AUTHOR_ID_QUERY, COMMUNITY_BY_AUTHOR_QUERY } from '@/sanity/lib/queries';
import { AtSign, Calendar, Info } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const experimental_ppr = true;

const page = async ({ params }) => {

    const id = (await params).id;
    const session = await auth();

    const [user, communities] = await Promise.all([
        client.fetch(AUTHOR_ID_QUERY, { id }),
        client.fetch(COMMUNITY_BY_AUTHOR_QUERY, { id })
    ])
    if (!user) return notFound();
    console.log("USer ==> ", user)

    return (
        <>
            <section className="profile_container relative">
                <div className="profile_card fixed top-0">
                    <div className="profile_title">
                        <h3 className="text-24-black text-center line-clamp-1 uppercase">
                            {user.name}
                        </h3>
                    </div>

                    <Image src={user.image} alt='avatar' width={220} height={220} className='profile_image' />

                    <p className="text-30-extrabold mt-7 text-center" > @{user?.username} </p>
                    <p className='mt-1 text-center text-14-normal' > {user?.bio} </p>
                </div>

                <div className="flex-1 flex flex-col gap-5 lg:-mt-5 pt-8">
                    <p className="text-30-bold">
                        {session?.id === id ? 'Your' : 'All'} Communities
                    </p>

                    {/* User Community */}

                    <Tabs defaultValue="communities">
                        <TabsList className="tab" >
                            <TabsTrigger value="communities" className="tab rounded-2xl" >
                                <Info className='flex sm:hidden text-light-400 font-bold' />
                                <h3 className="text-30-bold-light hidden sm:flex" > Communities </h3>
                            </TabsTrigger>
                            {session?.id === id && <TabsTrigger value="analysis" className="tab rounded-2xl" >
                                <AtSign className='flex sm:hidden text-light-400 font-bold' />
                                <h3 className="text-30-bold-light hidden sm:flex" > Profile Analysis </h3>
                            </TabsTrigger>}
                            {session?.id === id && <TabsTrigger value="calendar" className="tab rounded-2xl" >
                                <Calendar className='flex sm:hidden text-light-400 font-bold' />
                                <h3 className="text-30-bold-light hidden sm:flex" > User Calendar </h3>
                            </TabsTrigger>}

                        </TabsList>


                        <TabsContent value="communities">
                            <ul className='card_grid-sm mt-12' >
                                <Suspense fallback={<CommunityCardSkeleton />} >
                                    <UserCommunity communities={communities} />
                                </Suspense>
                            </ul>
                        </TabsContent>

                        <TabsContent value="analysis">
                            <ProfileAnalysis user={user} communities={communities} />
                        </TabsContent>

                        <TabsContent value="calendar" >
                            <HolidayCalendar />
                        </TabsContent>

                    </Tabs>


                </div>


            </section>
        </>
    )
}

export default page