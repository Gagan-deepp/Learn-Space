import { auth } from '@/auth';
import { client } from "@/sanity/lib/client"
import ThreadForm from '@/components/ThreadForm';
import { SELECT_COMMUNITY_QUERY } from "@/sanity/lib/queries"

const page = async () => {
  const session = await auth();

  if (!session) redirect('/');
  const communities = await client.fetch(SELECT_COMMUNITY_QUERY)
  return (
    <>
      <section className="bg_container !min-h-[230px] " >
        <h1 className="heading"> Create Your Thread </h1>
      </section>

      <ThreadForm communities={communities} />
    </>
  )
}

export default page
