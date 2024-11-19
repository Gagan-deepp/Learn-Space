import { getFileIcon } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const Thumbnail = ({ type , extension , url }) => {
    const isImage = type === "image" && extension != "svg"
  return (
    <figure className='thumbnail' >
        <Image src={isImage ? url : getFileIcon(extension,type)} alt='thumbnail' width={50} height={50} className={`size-8 object-contain ${isImage && 'thumbnail-image'}`} />
    </figure>
  )
}

export default Thumbnail