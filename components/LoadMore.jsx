"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { fetchCommunity } from "@/lib/actions";


const LoadMore = () => {

    const { ref, inView } = useInView();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let page = 2;

    useEffect(() => {
        if (inView) {
            setIsLoading(true);
            // Add a delay of 500 milliseconds
            const delay = 500;

            const timeoutId = setTimeout(() => {
                fetchCommunity(page).then((res) => {
                    setData([...data, ...res]);
                    page++;
                });

                setIsLoading(false);
            }, delay);

            // Clear the timeout if the component is unmounted or inView becomes false
            return () => clearTimeout(timeoutId);
        }
    }, [inView, data, isLoading]);
    return (
        <>
            {/* HOME SECTION */}



            {/* LOAD MORE SECTION */}
            <section className="flex justify-center items-center w-full">
                <div ref={ref} >
                    <Image
                        src="/icon/spinner.svg"
                        alt="spinner"
                        width={56}
                        height={56}
                        className="object-contain"
                    />
                </div>
            </section>
        </>
    )
}

export default LoadMore