'use client'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from './ui/button'
import Image from 'next/image'
import { convertFileToUrl, getFileType } from '@/lib/utils'
import Thumbnail from './Thumbnail'
import { Send, Upload, X } from 'lucide-react'

const FileUpload = ({ files, setFiles, ownerId, accountId }) => {

    const onDrop = useCallback(async (acceptedFiles) => {
        // Do something with the files
        setFiles(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const handleRemoveFile = (e, fileName) => {
        e.stopPropagation();
        setFiles((prev) => prev.filter((file) => file.name != fileName))
    }

    return (
        <div {...getRootProps()} className='cursor-pointer' >
            <input {...getInputProps()} />
            <Button type="button" className="" >
                <Upload className="size-4" />
            </Button>

            {files.length > 0 && <ul className='uploader-preview-list' >
                <h4 className='text-light-300' > Selected Images </h4>
                {files.map((file, index) => {
                    const { type, extension } = getFileType(file.name);

                    return (
                        <li key={`${file.name}-${index}`} className='uploader-preview-item' >
                            <div className='flex items-center gap-3' >
                                <Thumbnail type={type} extension={extension} url={convertFileToUrl(file)} />
                            </div>

                            <div className="preview-item-name">
                                {file.name}
                            </div>

                            <X onClick={(e) => handleRemoveFile(e, file.name)} />
                        </li>
                    )
                })}
            </ul>}
        </div>
    )
}

export default FileUpload