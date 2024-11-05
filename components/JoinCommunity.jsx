'use client'
import { joinCommunity, removeFromCommunity } from '@/lib/actions';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

const JoinCommunity = ({ id, user, isMember }) => {

    const [member, setMember] = useState(isMember) // true
    const [loading, setLoading] = useState(false);

    const handleBtn = async () => {
        setLoading(true);
        if (member) {
            const res = await removeFromCommunity(id, user._id)
            if (res.status === "SUCCESS") setMember(!member);
            setLoading(false);
        } else {
            const res = await joinCommunity(id, user);
            if (res.status === "SUCCESS") setMember(!member);
            setLoading(false);
        }
    }
    return (
        <div>
            <button onClick={handleBtn} disabled={loading} >
                <span className={`flex gap-3 join-btn ${loading && `!bg-black-hover`} `} >
                    {member ?
                        <>
                            {loading ? "Leaving..." : "Leave Community!"}
                            <Trash2 className='text-bg-white' />
                        </> :
                        <> {loading ? "Joining..." : "Join Community"} </>
                    }
                </span>
            </button>
        </div >
    )
}

export default JoinCommunity