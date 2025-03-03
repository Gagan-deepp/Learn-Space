import CommunityCard from "@/components/CommunityCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { COMMUNITY_QUERY, FAMOUS_COMMUNITY_QUERY } from "@/sanity/lib/queries";
import SearchBar from "../../components/SearchBar";
import Image from "next/image";
import Link from "next/link";
import Chatbot from "@/components/Chatbot";

export default async function Home({ searchParams }) {

  const search = (await searchParams).search;
  const params = { query: search || null };

  const [{ data: coms }, { data: famous }] = await Promise.all([
    sanityFetch({ query: COMMUNITY_QUERY, params }),
    sanityFetch({ query: FAMOUS_COMMUNITY_QUERY })
  ]);

  return (
    <>
      <section className="grey_container rounded-3xl relative mt-8" >
        <Image src="/bg1.jpg" alt="background" fill={true} className=" !z-[-1] rounded-3xl opacity-[0.6] object-cover" quality={100} />
        <h1 className="heading"> Grow Together, <br /> Learn Your Way </h1>
        <p className="!max-w-3xl tag" > Where Collaboration meets Personalized Learning </p>
        <SearchBar search={search} />
      </section>

      <section className="section_container" >
        <p className="text-30-semibold" >
          {search ? `Search results for "${search}"` : "Ongoing Communities"}
        </p>

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
      <SanityLive />
    </>
  );
}
