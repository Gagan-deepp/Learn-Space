import React from 'react'
import ThreadCard from './ThreadCard'
import { sanityFetch } from '@/sanity/lib/live'
import { THREAD_QUERY } from '@/sanity/lib/queries'

const Thread = async ({ id }) => {

    const { data: threads } = await sanityFetch({ query: THREAD_QUERY });

    return (
        threads.length > 0 ? (
            threads.map((thread) => (
                <ThreadCard thread={thread} key={thread._id} />
            )))
            : <p> No threads for this community ! Create One </p>
    )
}

export default Thread