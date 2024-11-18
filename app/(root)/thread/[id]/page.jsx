import { auth } from '@/auth';
import ActionDropDown from '@/components/ActionDropDown';
import CommentInput from '@/components/CommentInput';
import { formatDate, toCapitalize } from '@/lib/utils';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { COMMENT_OF_THREAD_QUERY, THREAD_BY_ID_QUERY } from '@/sanity/lib/queries';
import { Crown, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async ({ params }) => {
    const id = (await params).id;
    const session = await auth();

    const [{ data }, { data: comments }] = await Promise.all([
        await sanityFetch({ query: THREAD_BY_ID_QUERY, params: { id } }),
        await sanityFetch({ query: COMMENT_OF_THREAD_QUERY, params: { id } })
    ])

    return (
        <>
            <section className="section_container !w-[80%] !py-4 " >

                <div className="flex flex-col sm:flex-row justify-between mt-10 w-full gap-8" >
                    <div className="flex flex-col gap-8" >

                        <div className="flex items-start gap-5 flex-col" >
                            <Link href={`/user/${data.author?._id}`} className="flex gap-2 items-center mb-3">
                                <Image src={data.author.image} alt="avatar" width={38} height={38} className="rounded-full drop-shadow-lg" />

                                <div className='flex items-center gap-2' >
                                    <p className="text-14-medium !text-black-3"> @{data.author.username} </p>
                                    <p className="items-center"><Crown className="fill-black-3 size-5" /> </p>
                                </div>

                            </Link>
                        </div>

                        <div>
                            <h3 className="text-30-bold" > {toCapitalize(data?.title)} </h3>
                            <p className="text-16-medium !text-black-3"> {data?.description} </p>
                        </div>
                    </div>
                </div>

                <hr className="divider" />

                {/* Comments  */}
                {comments?.length > 0 ? (
                    comments?.map((comment) => (
                        <div className='member-card group flex flex-col' key={comment?._id}>

                            <div className='flex items-center justify-between gap-4 group-hover:text-white-1 flex-1' >
                                <div className='flex items-center gap-2 group-hover:text-white-1 flex-1' >
                                    <Link href={`/user/${comment?.author?._id}`}>
                                        <Image src={comment?.author?.image} alt="profile" width={38} height={38} className="rounded-full" />
                                    </Link>

                                    <div className='flex flex-1 justify-between items-center' >
                                        <Link href={`/user/${comment?.author?._id}`} >
                                            <p className="text-[12px] font-bold group-hover:text-white-1"> @{comment?.author?.name} </p>
                                        </Link>
                                        <p className="startup_card_date !text-[12px]" >
                                            {formatDate(comment?._createdAt)}
                                        </p>
                                    </div>
                                </div>
                                {session?.id === comment?.author._id && <ActionDropDown />}
                            </div>

                            {/* Content */}
                            <div>
                                <p className="startup-card_desc group-hover:text-white-1" >
                                    {comment?.content}
                                </p>
                            </div>

                            {/* FOOTER */}
                            <div className='flex-between' >
                                <div className="flex gap-1 items-center">
                                    <MessageCircle className="text-black-2 size-4 group-hover:text-light-400" />
                                    <span className="caption text-black-2 group-hover:text-light-400" > 58 </span>
                                </div>
                            </div>

                        </div>
                    ))
                ) : <p> No Comments Yet !! </p>}
            </section>

            {session && <CommentInput id={id} />}

            <SanityLive />
        </>
    )
}

export default page