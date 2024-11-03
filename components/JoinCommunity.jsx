import { joinCommunity, removeFromCommunity } from '@/lib/actions';
import { Trash2 } from 'lucide-react';

const JoinCommunity = ({ id, user, isMember }) => {
    return (
        <div>
            <form action={async () => {
                "use server"
                if (isMember) {
                    const res = await joinCommunity(id, user);
                }else{
                    const res = await removeFromCommunity(id, user._id)
                }
            }}>
                <button type="submit" disabled={isMember} >
                    <span className="max-sm:hidden join-btn flex gap-3" >
                        {isMember ?
                            <>
                                Leave Community!
                                <Trash2 className='text-bg-white' />
                            </> : "Join Community"}
                    </span>
                </button>
            </form>
        </div>
    )
}

export default JoinCommunity