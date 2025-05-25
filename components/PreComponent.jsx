"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CommunityCard from "@/components/CommunityCard"
import SearchBar from "@/components/SearchBar"
import Image from "next/image"
import Link from "next/link"
import Chatbot from "@/components/Chatbot"
import PreLoader from "./PreLoader"

const PreComponent = ({ coms, famous, search }) => {

    const [isLoading, setIsLoading] = useState(true)
    const opacityVar = {
        initial: {
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1.5,
                delay: 5,
                ease: [0.85, 0, 0.15, 1],
            }
        }
    }
    const scaleVar = {
        initial: {
            scale: 0.5
        },
        animate: {
            scale: 1,
            transition: {
                duration: 1,
                delay: 5.5,
                ease: [0.85, 0, 0.15, 1],
            }
        }
    }
    const variants = {
        initial: {
            y: 100,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1.5,
                delay: 5.7,
                ease: [0.85, 0, 0.15, 1],
            }
        }
    }

    return (
        <>
            <AnimatePresence mode='wait'>
                {isLoading && (
                    <PreLoader setIsLoading={setIsLoading} />
                )}
            </AnimatePresence>

            <div>
                <section className="grey_container rounded-3xl relative mt-8" >

                    <motion.div variants={scaleVar} initial="initial" animate="animate" className="overflow-hidden relative" >
                        <Image src="/bg1.jpg" alt="background" fill={true} className=" !z-[-1] rounded-3xl opacity-[0.6] object-cover" quality={100} />
                    </motion.div>

                    <motion.div variants={opacityVar} initial="initial" animate="animate" className="overflow-hidden relative heading" >
                        <motion.h1 variants={variants} initial="initial" animate="animate"> Grow Together, <br /> Learn Your Way </motion.h1>
                    </motion.div>

                    <motion.div variants={opacityVar} initial="initial" animate="animate" className="overflow-hidden relative !max-w-3xl tag" >
                        <motion.p variants={variants} initial="initial" animate="animate" > Where Collaboration meets Personalized Learning </motion.p>
                    </motion.div>
                    <div className="overflow-hidden relative" >
                        <motion.div variants={scaleVar} initial="initial" animate="animate" >
                            <SearchBar search={search} />
                        </motion.div>
                    </div>
                </section>

                <section className="section_container" >
                    <div>
                        <motion.p variants={variants} initial="initial" animate="animate" className="text-30-semibold" >
                            {search ? `Search results for "${search}"` : "Ongoing Communities"}
                        </motion.p>
                    </div>


                    <ul className="mt-8 card_grid" >
                        {coms?.length > 0 ? <>
                            {coms.map((com) => (
                                <CommunityCard key={com._id} com={com} />
                            ))}

                            <Link href="/community/all" className="caption hover:underline transition-all duration-200" > See all </Link>
                        </> : <p> No Communittes </p>}
                    </ul>
                </section>

                {!search && <section className="section_container" >
                    <p className="text-30-semibold" >
                        Top Communities
                    </p>

                    <ul className="mt-8 card_grid" >
                        {famous?.length > 0 ? <>
                            {famous.map((com) => (
                                <CommunityCard key={com._id} com={com} />
                            ))}
                            <Link href="/community/all" className="caption hover:underline transition-all duration-200" > See all </Link>
                        </> : <p> No Communittes </p>}
                    </ul>
                </section>}

                <Chatbot />
            </div>
        </>

    )
}

export default PreComponent