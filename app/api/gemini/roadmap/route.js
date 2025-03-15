import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { roadmapPrompt } from "@/lib/data" // Make sure to import your roadmap prompt
import { generateText } from "ai"

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY || "",
})

export const runtime = "edge"

export async function POST(request) {
    try {
        const { skill, experience, days } = await request.json()

        if (!skill || !experience || !days) {
            return new Response(JSON.stringify({ error: "Missing required parameters" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            })
        }

        const messages = [
            { role: "system", content: roadmapPrompt.content },
            {
                role: "user",
                content: `Generate roadmap for:
                - Skill: ${skill}
                - Experience Level: ${experience}
                - Duration: ${days} days
                `
            }
        ]

        const { text } = await generateText({
            model: google("gemini-1.5-pro-latest"),
            messages,
            temperature: 0.3,
            maxTokens: 2000
        })

        //Cleaning response
        const cleanedText = text
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim()

        const parsedData = JSON.parse(cleanedText)
        return new Response(JSON.stringify(parsedData), {
            headers: { "Content-Type": "application/json" },
        })

    } catch (error) {
        console.error("Roadmap generation error:", error)
        return new Response(
            JSON.stringify({
                error: "Failed to generate roadmap",
                details: error instanceof Error ? error.message : "Unknown error",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        )
    }
}