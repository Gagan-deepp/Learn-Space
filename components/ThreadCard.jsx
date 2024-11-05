import { formatDate } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const ThreadCard = ({ thread }) => {

    const { _createdAt, author, _id, description, community, comment, title } = thread;
    return (
        <div className='startup-card group' >

            <div className='flex items-center gap-4 group-hover:text-white-1' >
                <Link href={`/user/${author?._id}`}>
                    <Image src={author?.image} alt="profile" width={50} height={50} className="rounded-full" />
                </Link>

                <div className='flex flex-col gap-1' >
                    <Link href={`/user/${author?._id}`} >
                        <p className="text-[16px] font-bold group-hover:text-white-1"> @{author?.name} </p>
                    </Link>
                    <p className="startup_card_date !text-[12px]" >
                        {formatDate(_createdAt)}
                    </p>
                </div>
            </div>

            <Link href={`/thread/${_id}`}  >
                <h3 className='startup-card_title group-hover:text-white-1' >
                    {title}
                </h3>
                <p className="startup-card_desc group-hover:text-white-1" >
                    {description}
                </p>
            </Link>

            <div className='flex-between group-hover:text-white-1 mt-3' >
                <div className="flex gap-1 items-center">
                    <MessageCircle className="text-black-2 size-4 group-hover:text-white-1" />
                    <span className="text-16-medium group-hover:text-white-1 " > {comment} </span>
                </div>

                <Link href={`/?search=${community?._id}`} className="startup-card_btn" >
                    <p className="text-16-medium !text-white-1" >
                        {community?.title}
                    </p>
                </Link>
            </div>

        </div>
    )
}

export default ThreadCard
