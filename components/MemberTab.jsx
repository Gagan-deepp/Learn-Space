import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { MEMBER_QUERY } from "@/sanity/lib/queries";
import { Crown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MemberTab = async ({ id }) => {
    const params = { id } //community id
    const { data } = await sanityFetch({ query: MEMBER_QUERY, params }); // Fetching members
    return (
        <div className="flex flex-col gap-3" >
            {/* AUTHOR */}
            <MemberCard user={data?.author} isAuthor={true} />

            {/* REST MEMBER */}
            {data?.members?.length > 0 && data.members.filter((member) => member.id != data.author.id).map((member) => <MemberCard user={member} key={member.id} />)}

            <SanityLive />
        </div>
    )
}

export default MemberTab

const MemberCard = ({ user, isAuthor = false }) => {
    return (
        <Link href={`/user/${user?._id}`} className='member-card group flex' >
            <div className='flex items-center justify-between flex-1 group-hover:text-white-1' >
                <div className="flex gap-2 items-center group-hover:text-white-1">
                    <Image src={user?.image} alt="avatar" width={48} height={48} className="rounded-full drop-shadow-lg" />
                    <div>
                        <p className="text-16-medium group-hover:text-white-1"> @{user?.username} </p>
                        <p className="text-16-medium line-clamp-2 group-hover:text-white-1"> {user?.bio} </p>
                    </div>
                </div>
                {isAuthor && <p className="text-20-medium size-5"> <Crown className="fill-black-3 size-5" /> </p>}
            </div>
        </Link>
    )
}