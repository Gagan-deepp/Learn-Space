import React from 'react'

const Ping = () => {
    return (
        <div className='relative' >
            <div className="absolute -left-4 -top-1">
                <span className="flex size-[9px] ">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75">
                        <span className="relative inline-flex size-[9px] rounded-full bg-red-400 "></span>
                    </span>
                </span>
            </div>
        </div>
    )
}

export default Ping
