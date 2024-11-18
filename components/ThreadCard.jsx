import { formatDate } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ActionDropDown from './ActionDropDown';

const ThreadCard = ({ thread }) => {

    const { _createdAt, author, _id, description, community, commentCount, title } = thread;
    return (
        <Link href={`/thread/${_id}`} className='member-card group flex flex-col' >

            <div className='flex items-center justify-between gap-4 group-hover:text-white-1' >

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
                <ActionDropDown />
            </div>

            {/* HEADING & DESCRIPTION */}
            <div>
                <h3 className='startup-card_title group-hover:text-white-1' >
                    {title}
                </h3>
                <p className="startup-card_desc group-hover:text-white-1" >
                    {description}
                </p>
            </div>

            {/* FOOTER */}
            <div className='flex-between' >
                <div className="flex gap-1 items-center">
                    <MessageCircle className="text-black-2 size-4 group-hover:text-light-400" />
                    <span className="caption text-black-2 group-hover:text-light-400" > {commentCount} </span>
                </div>

                <Link href={`/community/${community?._id}`} className="startup-card_btn" >
                    <p className="text-16-medium !text-white-1" >
                        {community?.title}
                    </p>
                </Link>
            </div>

        </Link>
    )
}

export default ThreadCard
