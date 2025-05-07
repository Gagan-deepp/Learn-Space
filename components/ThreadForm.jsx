"use client"

import { createThread } from '@/lib/actions'
import { threadSchema } from '@/lib/validation'
import { Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useState } from 'react'
import { z } from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import CommunitySelect from './CommunitySelect'
import { toast } from 'sonner'

const ThreadForm = ({ communities }) => {

    const [errors, setErrors] = useState({})
    const [community, setCommunity] = useState("")
    const router = useRouter();

    const handleFormSubmit = async (prevState, formData) => {
        try {
            const formValues = {
                title: formData.get("title"),
                description: formData.get("description"),
            }
            await threadSchema.parseAsync(formValues);
            const res = await createThread(prevState, formData, community)

            if (res.status === 'SUCCESS') {
                toast.success("Thread created successfull")
                router.push(`/community/${community}`)
            }
        } catch (error) {

            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors);
                toast.error("Please check your input and try again..")


                return { ...prevState, error: "Validation Failed", status: "Error" }
            }

            console.log(error)

            toast.error("An unexpected Error Occured")
            return {
                ...prevState,
                error: "An unexpected Error Occured",
                status: "Error"
            }
        }
    }
    const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: "", status: "INITIAL" });

    return (
        <form action={formAction} className='startup-form'  >
            <div>
                <label htmlFor="title" className='startup-form_label' > Title </label>
                <Input id="title" name="title" required className='startup-form_input' placeholder="Thread Title" />
                {errors.title && <p className='startup-form_error'> {errors.title} </p>}
            </div>

            <div>
                <label htmlFor="description" className='startup-form_label' > Description </label>
                <Textarea id="description" name="description" required className='startup-form_textarea' placeholder="Thread Description" />
                {errors.description && <p className='startup-form_error'> {errors.description} </p>}
            </div>

            <div>
                <label htmlFor="community" className='startup-form_label' > Community </label>
                <CommunitySelect id="community" name="community" required communities={communities} community={community} setCommunity={setCommunity} />
                {errors.category && <p className='startup-form_error'> {errors.category} </p>}
            </div>

            <Button type="submit" className="startup-form_btn text-bg-white" disbaled={isPending ? "true " : "false"} >
                {isPending ? 'Creating...' : 'Create your thread'}
                <Send className='size-6 ml-2' />
            </Button>
        </form>
    )
}

export default ThreadForm