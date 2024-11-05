import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AddThread = () => {
    return (
        <div className="add-container" >
            <Link href="thread/new" className="view-text" >
                <span className="font-bold" > <Plus /> </span>
            </Link>
        </div>
    )
}

export default AddThread
