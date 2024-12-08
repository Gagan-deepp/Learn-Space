import { auth } from '@/auth';
import { CommunityCardSkeleton } from '@/components/CommunityCard';
import UserCommunity from '@/components/UserCommunity';
import { client } from '@/sanity/lib/client';
import { AUTHOR_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarDays, UsersRound } from 'lucide-react';

export const experimental_ppr = true;

const page = async ({ params }) => {

    const id = (await params).id;
    const session = await auth();

    const user = await client.fetch(AUTHOR_ID_QUERY, { id });
    if (!user) return notFound();

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


                <Tabs defaultValue="community" className='w-full' >
                    <TabsList className="tab" >
                        <TabsTrigger value="community" className="tab rounded-2xl" >
                            <UsersRound className='flex text-light-400 font-bold' />
                            <h3 className="text-30-bold-light hidden sm:flex" > Communities </h3>
                        </TabsTrigger>
                        <TabsTrigger value="calender" className="tab rounded-2xl" >
                            <CalendarDays className='flex text-light-400 font-bold' />
                            <h3 className="text-30-bold-light hidden sm:flex" > Calender </h3>
                        </TabsTrigger>
                    </TabsList>


                    <TabsContent value="community">
                        <div className="flex-1 flex flex-col gap-5 lg:-mt-5 pt-8">
                            <p className="text-30-bold">
                                {session?.id === id ? 'Your' : 'All'} Communities
                            </p>

                            {/* User Community */}
                            <ul className='card_grid-sm' >
                                <Suspense fallback={<CommunityCardSkeleton />} >
                                    <UserCommunity id={id} />
                                </Suspense>
                            </ul>
                        </div>
                    </TabsContent>

                    <TabsContent value="calender">
                        <h2> Calender </h2>
                    </TabsContent>


                </Tabs>

            </section>
        </>
    )
}

export default page