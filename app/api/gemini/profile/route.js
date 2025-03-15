import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { analysisSystemPrompt } from "@/lib/data"
import { generateText } from "ai" // Import generateText

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY || "",
})

export const runtime = "edge"

export async function POST(request) {
    const { user, communities } = await request.json()

    // Handle empty communities case
    if (!communities || communities.length === 0) {
        return new Response(
            JSON.stringify({
                error: "Join or Create community for profile suggestions",
                analysis: null,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            },
        )
    }

    try {
        // Build messages array with system prompt and user data
        const messages = [
            { role: "system", content: analysisSystemPrompt.content },
            {
                role: "user",
                content: `Analyze communities for user ${user.name}:\n${communities
                    .map((c) => `- ${c.title} (${c.category}): ${c.description}`)
                    .join("\n")}\n\nRespond ONLY with a valid JSON object.`,
            },
        ]

        // Use generateText instead of streamText for more reliable JSON output
        const { text } = await generateText({
            model: google("gemini-1.5-pro-latest"),
            messages,
            temperature: 0.3,
        })

        // Clean and parse the JSON response
        let cleanedText = text.trim()

        // Remove markdown code blocks if present
        if (cleanedText.startsWith("```json")) {
            cleanedText = cleanedText.replace(/```json\n/, "").replace(/\n```$/, "")
        } else if (cleanedText.startsWith("```")) {
            cleanedText = cleanedText.replace(/```\n/, "").replace(/\n```$/, "")
        }

        try {
            // Validate JSON by parsing it
            const parsedJson = JSON.parse(cleanedText)

            // Return the parsed JSON
            return new Response(JSON.stringify(parsedJson), {
                headers: { "Content-Type": "application/json" },
            })
        } catch (parseError) {
            console.error("JSON parsing error:", parseError, "Raw text:", cleanedText)
            return new Response(
                JSON.stringify({
                    error: "Failed to parse AI response as JSON",
                    rawResponse: cleanedText.substring(0, 500), // Include part of the raw response for debugging
                }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                },
            )
        }
    } catch (error) {
        console.error("Analysis error:", error)
        return new Response(
            JSON.stringify({
                error: "Failed to generate analysis",
                details: error instanceof Error ? error.message : "Unknown error",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            },
        )
    }
}

