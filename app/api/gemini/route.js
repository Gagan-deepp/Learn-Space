import { streamText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { initialMessage } from "@/lib/data"

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY || ""
})

export const runtime = "edge"

const generateId = () => Math.random().toString(36).slice(2, 15)

const buildGoogleGenAiPrompt = (messages) => [
    {
        id: generateId(),
        role: "user",
        content: initialMessage.content
    },
    ...messages.map((message) => ({
        id: message.id || generateId(),
        role: message.role,
        content: message.content
    })),
]

export async function POST(request) {
    const { messages } = await request.json()
    const stream = await streamText({
        model: google("gemini-1.5-pro-latest"),
        messages: buildGoogleGenAiPrompt(messages),
        temperature: 0.7
    })
    return stream?.toDataStreamResponse();
}