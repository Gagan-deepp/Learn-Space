'use client'

import { Button } from "./ui/button"
import { useState } from "react"
import { SendHorizonal, LoaderCircle } from "lucide-react"
import { addComment } from "@/lib/actions"
import Image from "next/image"
import { Textarea } from "./ui/textarea"
import FileUpload from "./FileUpload"
import { toast } from "sonner"

const CommentInput = ({ id }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState("");
    const [files, setFiles] = useState([])

    const handleAction = async () => {
        setIsLoading(true);
        let success = false;

        // Perform a server saction here
        let res = await addComment(value, id, files);

        if (res.status = "SUCCESS") {
            setIsLoading(false);
            setValue("");
            setFiles([]);
            toast.success("Comment Added !!")
        }
    };


    return (
        <div className='view-container !right-1/4 w-1/2 comment-form_input !px-2 !py-2' >

            <FileUpload files={files} setFiles={setFiles} />
            <Textarea type="text" placeholder="Write a comment..." disabled={isLoading} required className='comment-form_input !border-none !mt-0 '
                value={value} onChange={(e) => setValue(e.target.value)} />

            <Button className="bg-transparent" onClick={handleAction} >
                {isLoading ? (
                    <LoaderCircle className="size-4 animate-spin" />
                ) : (
                    <SendHorizonal />
                )}
            </Button>
        </div>
    )
}

export default CommentInput