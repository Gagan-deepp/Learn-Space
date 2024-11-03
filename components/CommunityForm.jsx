"use client"

import { formSchema } from '@/lib/validation'
import MDEditor, { title } from '@uiw/react-md-editor'
import { Send } from 'lucide-react'
import { useActionState, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { createCommunity } from '@/lib/actions'

const CommunityForm = () => {

    const [errors, setErrors] = useState({})
    const [pitch, setPitch] = useState("");
    const { toast } = useToast();
    const router = useRouter();

    const handleFormSubmit = async (prevState, formData) => {
        try {
            const formValues = {
                title: formData.get("title"),
                description: formData.get("description"),
                category: formData.get("category"),
                link: formData.get("link"),
                pitch,
            }
            await formSchema.parseAsync(formValues);
            const res = await createCommunity(prevState, formData, pitch)

            if (res.status === 'SUCCESS') {
                toast({
                    title: 'Success',
                    description: 'Community Created Successfully'
                })

                router.push(`/community/${res._id}`)
            }
        } catch (error) {

            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors);

                toast({
                    title: 'Error',
                    description: 'Please check your input and try again..'
                })

                return { ...prevState, error: "Validation Failed", status: "Error" }
            }

            toast({
                title: 'Error',
                description: 'An unexpected Error Occured'
            })
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
                <Input id="title" name="title" required className='startup-form_input' placeholder="Community Title" />
                {errors.title && <p className='startup-form_error'> {errors.title} </p>}
            </div>

            <div>
                <label htmlFor="description" className='startup-form_label' > Description </label>
                <Textarea id="description" name="description" required className='startup-form_textarea' placeholder="Community Description" />
                {errors.description && <p className='startup-form_error'> {errors.description} </p>}
            </div>

            <div>
                <label htmlFor="category" className='startup-form_label' > Category </label>
                <Input id="category" name="category" required className='startup-form_input' placeholder="Community Category (Web , Android , 3rd Year...)" />
                {errors.category && <p className='startup-form_error'> {errors.category} </p>}
            </div>

            <div>
                <label htmlFor="link" className='startup-form_label' > Image URL </label>
                <Input id="link" name="link" required className='startup-form_input' placeholder="Community Image" />
                {errors.link && <p className='startup-form_error'> {errors.link} </p>}
            </div>

            <div data-color-mode="light" >
                <label htmlFor="pitch" className='startup-form_label' > Pitch </label>

                <MDEditor
                    value={pitch} onChange={(value) => setPitch(value)}
                    className='startup-form_editor'
                    id='pitch' preview='edit' height={300}
                    style={{ borderRadius: 20, overflow: 'hidden' }}
                    textareaProps={{
                        placeholder: 'Briefly describe your community ideas and problems'
                    }}
                    previewOptions={{
                        disallowedElements: ["style"]
                    }}
                />
                {errors.link && <p className='startup-form_error'> {errors.link} </p>}
            </div>

            <Button type="submit" className="startup-form_btn text-bg-white" disbaled={isPending} >
                {isPending ? 'Creating...' : 'Create your community'}
                <Send className='size-6 ml-2' />
            </Button>
        </form>
    )
}

export default CommunityForm
