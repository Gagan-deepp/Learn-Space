import { z } from "zod"

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(10).max(500),
    category: z.string().min(3).max(20),
    link: z.string().url(),
    pitch: z.string().min(5),
})

export const threadSchema = z.object({
    title: z.string().min(3).max(30),
    description: z.string().min(10).max(500),
})