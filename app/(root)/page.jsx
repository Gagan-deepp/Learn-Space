import PreComponent from "@/components/PreComponent";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { COMMUNITY_QUERY, FAMOUS_COMMUNITY_QUERY } from "@/sanity/lib/queries";

export default async function Home({ searchParams }) {

  const search = (await searchParams).search;
  const params = { query: search || null };

  const [{ data: coms }, { data: famous }] = await Promise.all([
    sanityFetch({ query: COMMUNITY_QUERY, params }),
    sanityFetch({ query: FAMOUS_COMMUNITY_QUERY })
  ]);

  return (
    <>
      <PreComponent coms={coms} famous={famous} search={search} />
      <SanityLive />
    </>
  );
}
