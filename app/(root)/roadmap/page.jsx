import RoadmapForm from '@/components/RoadmapForm'
import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <>
            <section className="grey_container rounded-3xl relative mt-8" >
                <Image src="/bg1.jpg" alt="background" fill={true} className=" !z-[-1] rounded-3xl opacity-[0.6] object-cover" quality={100} />
                <h1 className="heading"> Create Your Learning <br /> Roadmap </h1>
                <p className="!max-w-3xl tag" > Customize your learning journey based on your goals, experience, and timeline. </p>
            </section>

            <RoadmapForm />

        </>
    )
}

export default page
