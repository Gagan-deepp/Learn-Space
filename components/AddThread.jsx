import { auth } from '@/auth';
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AddThread = async () => {
    const session = await auth();
    if (!session) return;
    return (
        <div className="add-container" title='Create Thread' >
            <Link href="/thread/new" className="view-text !rounded-full" >
                <span className="font-bold" > <Plus /> </span>
            </Link>
        </div>
    )
}

export default AddThread
