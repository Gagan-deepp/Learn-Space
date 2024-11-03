import { auth } from '@/auth';
import { CommunityCardSkeleton } from '@/components/CommunityCard';
import UserCommunity from '@/components/UserCommunity';
import { client } from '@/sanity/lib/client';
import { AUTHOR_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const experimental_ppr = true;

const page = async ({ params }) => {

    const id = (await params).id;
    const session = await auth();

    const user = await client.fetch(AUTHOR_ID_QUERY, { id });
    if (!user) return notFound();

    return (
        <>
            <section className="profile_container">
                <div className="profile_card">
                    <div className="profile_title">
                        <h3 className="text-24-black text-center line-clamp-1 uppercase">
                            {user.name}
                        </h3>
                    </div>

                    <Image src={user.image} alt='avatar' width={220} height={220} className='profile_image' />

                    <p className="text-30-extrabold mt-7 text-center" > @{user?.username} </p>
                    <p className='mt-1 text-center text-14-normal' > {user?.bio} </p>
                </div>

                <div className="flex-1 flex flex-col gap-5 lg:-mt-5 ">
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
            </section>
        </>
    )
}

export default page