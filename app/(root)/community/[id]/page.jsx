import { auth } from "@/auth";
import AddThread from "@/components/AddThread";
import CommunityTab from "@/components/CommunityTab";
import JoinCommunity from "@/components/JoinCommunity";
import MemberCount from "@/components/MemberCount";
import { Skeleton } from "@/components/ui/skeleton";
import { client } from "@/sanity/lib/client";
import { AUTHOR_ID_QUERY, COMMUNITY_BY_ID_QUERY } from "@/sanity/lib/queries";
import { Crown } from "lucide-react";
import markdownit from "markdown-it";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const md = markdownit();
export const experimental_ppr = true;

const page = async ({ params }) => {

    const id = (await params).id; //Post ID
    const session = await auth(); // Current User ID i.e. Visiting Page 


    const [post, user] = await Promise.all([
        client.fetch(COMMUNITY_BY_ID_QUERY, { id }),
        session ? client.fetch(AUTHOR_ID_QUERY, { id: session?.id }) : Promise.resolve(null)
    ])

    //Checking if current User is Author or not
    const isAuthor = session != null ? post?.author?.id === user?.id : false;
    //Check if current User is member of community or not
    const isMember = session != null ? post?.members?.some(member => member?.id === user?.id) : false

    if (!post) return notFound();
    const parsedContent = md.render(post?.pitch || '');

    return (
        <>
            <section className="section_container !w-[90%] !py-4" >

                {/* NAME AND BACKGROUND IMAGE OF COMMUNITY */}
                <div className="flex flex-col sm:flex-row justify-between mt-10 w-full gap-8" >
                    <div className="flex flex-col gap-8" >
                        <div>
                            <h3 className="text-30-bold" > {post?.title} </h3>
                            <p className="text-16-medium !text-black-3"> {post.description} </p>
                        </div>

                        <div className="flex items-start gap-5 flex-col" >
                            <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3">
                                <Image src={post.author.image} alt="avatar" width={56} height={56} className="rounded-full drop-shadow-lg" />

                                <div>
                                    <p className="text-20-medium flex gap-3 items-center"> {post.author.name} <Crown className="fill-black-3 size-5" /> </p>
                                    <p className="text-16-medium !text-black-3"> @{post.author.username} </p>
                                </div>

                            </Link>
                            <p className="category-tag"> {post.category} </p>

                            {/* JOIN COMMUNITY BTN */}
                            {!isAuthor && session && <JoinCommunity id={id} user={user} isMember={isMember} />}
                        </div>
                    </div>

                    <div className=" overflow-hidden w-full min-h-[350px] sm:w-[540px] sm:h-[360px] " >
                        <img src={post.image} alt="background" className="w-full h-full rounded-xl object-cover" />
                    </div>
                </div>

                {/* TABS */}
                <div className="mt-20 max-w-5xl mx-auto" >
                    <CommunityTab parsedContent={parsedContent} id={id} />
                </div>
                <hr className="divider" />

                {/* //TODO :: THREAD PART */}

                {/* Member Count */}
                <Suspense fallback={<Skeleton className="view_skeleton" />} >
                    <MemberCount id={id} />
                </Suspense>

                <AddThread />
            </section>
        </>
    )
}

export default page
