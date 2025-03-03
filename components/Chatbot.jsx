"use client"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowDownCircle, LoaderIcon, MessageCircle, Send, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { useChat } from "@ai-sdk/react"
import { ScrollArea } from "./ui/scroll-area"
import { Input } from "./ui/input"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const Chatbot = () => {
    const chatIconRef = useRef(null)
    const scrollRef = useRef(null)
    const [isChatOpen, setIsChatOpen] = useState(false)

    const { messages, input, handleInputChange, handleSubmit, isLoading, stop, reload, error } = useChat({
        api: "/api/gemini"
    })

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen)
    }

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])


    return (
        <>
            <div className="fixed bottom-4 right-4 z-50" >
                <Button ref={chatIconRef} onClick={toggleChat} size="icon" className="rounded-3xl size-14 p-2 shadow-lg" >
                    {isChatOpen ? (<MessageCircle className="size-12" />) : (<ArrowDownCircle />)}
                </Button>
            </div>


            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-20 right-4 z-50 w-[95%] sm:w-[500px] "
                    >
                        <Card className="border-2 bg-white" >
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3" >
                                <CardTitle className="text-lg font-bold" >  Chat Suport </CardTitle>
                                <Button onClick={toggleChat} variant="ghost" size="icon" className="px-2 py-0" >
                                    <X className="size-4" />
                                </Button>
                            </CardHeader>

                            <CardContent>
                                <ScrollArea className="h-[300px] pr-4 " >
                                    {messages?.length === 0 && (
                                        <div className="w-full mt-32 text-gray-500 items-center justify-center flex gap-4" >
                                            No messages yet
                                        </div>
                                    )}

                                    {messages?.map((message, index) => (
                                        <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`} >
                                            <div className={`inline-block rounded-lg p-4 ${message.role === "user" ? 'bg-primary text-black-3 ' : 'bg-gray-500 text-white-1 '} `} >
                                                <ReactMarkdown
                                                    children={message.content}
                                                    remarkPlugins={[remarkGfm]}
                                                    components={{
                                                        code({ node, inLine, className, children, ...props }) {
                                                            return inLine ? (
                                                                <code {...props} className="bg-gray-200 px-1 rounded"  >
                                                                    {children}
                                                                </code>
                                                            ) : (
                                                                <pre {...props} className="bg-gray-200 px-1 rounded"  >
                                                                    <code>
                                                                        {children}
                                                                    </code>
                                                                </pre>
                                                            )
                                                        },
                                                        ul: ({ children }) => (
                                                            <ul className="list-disc ml-4" >
                                                                {children}
                                                            </ul>
                                                        ),
                                                        ol: ({ children }) => (
                                                            <li className="list-decimal ml-4" > {children} </li>
                                                        )
                                                    }}

                                                />
                                            </div>

                                        </div>
                                    ))}

                                    {isLoading && (
                                        <div className="w-full items-center flex justify-center gap-4" >
                                            <LoaderIcon className="animate-spin h-5 w-5" />
                                            <button className="underline" type="button" onClick={() => stop()} >
                                                Abort
                                            </button>

                                        </div>
                                    )}

                                    {error && (
                                        <div className="w-full items-center justify-center flex gap-4" >
                                            <div> An error occured </div>
                                            <button className="underline" type="button" onClick={() => reload()} >
                                                Retry
                                            </button>
                                        </div>
                                    )}

                                    <div ref={scrollRef} />
                                </ScrollArea>
                            </CardContent>

                            <CardFooter>
                                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2" >
                                    <Input value={input} onChange={handleInputChange} className="flex-1" placeholder="Type your message..." />
                                    <Button type="submit" className="size-9" disabled={isLoading} size="icon" > <Send className="size-4" /> </Button>
                                </form>
                            </CardFooter>
                        </Card>

                    </motion.div>
                )}
            </AnimatePresence>

        </>
    )
}

export default Chatbot