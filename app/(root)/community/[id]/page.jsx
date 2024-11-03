import { auth } from "@/auth";
import MemberCount from "@/components/MemberCount";
import { Skeleton } from "@/components/ui/skeleton";
import { joinCommunity } from "@/lib/actions";
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
    const { id: userId } = await auth(); // Current User ID i.e. Visiting Page 

    const [post, user] = await Promise.all([
        await client.fetch(COMMUNITY_BY_ID_QUERY, { id }),
        await client.fetch(AUTHOR_ID_QUERY, { id: userId })
    ])
    //Checking if current User is Author or not
    const isAuthor = post?.author?.id === user?.id
    //Check if current User is member of community or not
    const isMember = post?.members?.some(member => member?.id === user?.id)

    if (!post) return notFound();
    const parsedContent = md.render(post?.pitch || '');

    return (
        <>
            <section className="section_container !w-[80%]" >

                {/* NAME AND BACKGROUND IMAGE OF COMMUNITY */}
                <div className="flex flex-col-reverse sm:flex-row justify-between mt-10 w-full " >

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

                                <p className="category-tag"> {post.category} </p>
                            </Link>

                            {/* JOIN COMMUNITY BTN */}
                            {!isAuthor && <div>
                                <form action={async () => {
                                    "use server"
                                    const res = await joinCommunity(id, user);
                                }}>
                                    <button type="submit" disabled={isMember} >
                                        <span className="max-sm:hidden join-btn" > {isMember ? "Joined!" : "Join Community"} </span>
                                    </button>
                                </form>
                            </div>}

                        </div>
                    </div>

                    <div className="w-[540px] h-[360px] overflow-hidden" >
                        <img src={post.image} alt="background" className="w-full h-full rounded-xl object-cover" />
                    </div>
                </div>

                {/* MARKDOWN */}
                <h3 className="text-30-bold" > Community Details </h3>
                {parsedContent ? (
                    <article
                        className="prose max-w-full font-work-sans break-all mt-8"
                        dangerouslySetInnerHTML={{ __html: parsedContent }}
                    />
                ) : (<p className="no-result" > No details provided </p>)}

                <hr className="divider" />

                {/* //TODO :: THREAD PART */}

                {/* Member Count */}
                <Suspense fallback={<Skeleton className="view_skeleton" />} >
                    <MemberCount id={id} />
                </Suspense>
            </section>
        </>
    )
}

export default page
