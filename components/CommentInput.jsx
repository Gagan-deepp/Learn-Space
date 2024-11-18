'use client'

import { Button } from "./ui/button"
import { useState } from "react"
import { SendHorizonal } from "lucide-react"
import { addComment } from "@/lib/actions"
import Image from "next/image"
import { Textarea } from "./ui/textarea"

const CommentInput = ({ id }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState("");

    const handleAction = async () => {
        setIsLoading(true);
        let success = false;

        // Perform a server saction here
        success = await addComment(value, id);
        setIsLoading(false);
        setValue("")
    };


    return (
        <div className='view-container !right-1/4 w-1/2 comment-form_input !px-2 !py-2' >
            <Textarea type="text" placeholder="Write a comment..." disabled={isLoading} required className='comment-form_input !border-none !mt-0 '
                value={value} onChange={(e) => setValue(e.target.value)} />

            <Button className="bg-transparent" onClick={handleAction} >
                {isLoading ? (
                    <Image
                        src="=/icon/loader.svg"
                        alt="loader"
                        width={24}
                        height={24}
                        className="animate-spin"
                    />
                ) : (
                    <SendHorizonal />
                )}
            </Button>
        </div>
    )
}

export default CommentInput