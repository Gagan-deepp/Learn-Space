import { client } from '@/sanity/lib/client'
import { COMMUNITY_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import CommunityCard from './CommunityCard'

const UserCommunity = async ({ communities }) => {

    
    console.log("Communities ==> ", communities)

    return (
        <>
            {communities.length > 0 ? communities.map((community) => (
                <CommunityCard key={community._id} com={community} />
            )) : (
                <p className='no-result' >
                    No Posts Yet
                </p>
            )}
        </>
    )
}

export default UserCommunity
