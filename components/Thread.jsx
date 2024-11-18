import React from 'react'
import ThreadCard from './ThreadCard'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { THREAD_QUERY } from '@/sanity/lib/queries'

const Thread = async ({ id }) => {

    const params = { id } //community id
    const { data: threads } = await sanityFetch({ query: THREAD_QUERY, params }); // Fetching thread related to the community

    return (
        <div className='flex flex-col gap-3' >
            {threads.length > 0 ? (
                threads.map((thread) => (
                    <ThreadCard thread={thread} key={thread._id} />
                )))
                : <p> No threads for this community ! Create One </p>}
            <SanityLive />
        </div>
    )
}

export default Thread