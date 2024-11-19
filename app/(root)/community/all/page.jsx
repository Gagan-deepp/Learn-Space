import { auth } from '@/auth';
import CommunityCard from '@/components/CommunityCard';
import PagePagination from '@/components/PagePagination';
import { fetchCommunity } from '@/lib/actions';
import Image from 'next/image';

const page = async ({ searchParams }) => {

    const session = await auth();
    const currentPage = (await searchParams).page || 1;

    const { data: communities } = await fetchCommunity(currentPage);

    return (
        <>
            <section className="grey_container rounded-3xl relative mt-8" >
                <Image src="/bg1.jpg" alt="background" fill={true} className=" !z-[-1] rounded-3xl opacity-[0.6] object-cover" quality={100} />
                <h1 className="heading"> Explore Communities </h1>
            </section>

            {/* Whole Community and Pagination Component  */}
            <section className='section_container' >
                <ul className="mt-8 card_grid" >
                    {communities?.length > 0 ? (
                        communities.map((com) => (
                            <CommunityCard key={com._id} com={com} />
                        ))
                    ) : <p> No Communittes </p>}
                </ul>
            </section>

            <PagePagination currentPage={currentPage} />
        </>
    )
}

export default page