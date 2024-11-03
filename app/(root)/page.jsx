import CommunityCard from "@/components/CommunityCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { COMMUNITY_QUERY, FAMOUS_COMMUNITY_QUERY } from "@/sanity/lib/queries";
import SearchBar from "../../components/SearchBar";

export default async function Home({ searchParams }) {

  const search = (await searchParams).search;
  const params = { query: search || null };

  const [{ data: coms }, { data: famous }] = await Promise.all([
    await sanityFetch({ query: COMMUNITY_QUERY, params }),
    await sanityFetch({ query: FAMOUS_COMMUNITY_QUERY })
  ])

  return (
    <>
      <section className="grey_container rounded-3xl" >
        <h1 className="heading"> Grow Together, <br /> Learn Your Way </h1>
        <p className="sub-heading !max-w-3xl" > Where Collaboration meets Personalized Learning </p>
        <SearchBar search={search} />
      </section>

      <section className="section_container" >
        <p className="text-30-semibold" >
          {search ? `Search results for "${search}"` : "Ongoing Communities"}
        </p>

        <ul className="mt-8 card_grid" >
          {coms?.length > 0 ? (
            coms.map((com) => (
              <CommunityCard key={com._id} com={com} />
            ))
          ) : <p> No Communittes </p>}
        </ul>
      </section>

      {!search && <section className="section_container" >
        <p className="text-30-semibold" >
          Top Communities
        </p>

        <ul className="mt-8 card_grid" >
          {famous?.length > 0 ? (
            famous.map((com) => (
              <CommunityCard key={com._id} com={com} />
            ))
          ) : <p> No Communittes </p>}
        </ul>
      </section>}

      <SanityLive />
    </>
  );
}
