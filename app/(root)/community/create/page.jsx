import { auth } from "@/auth"
import CommunityForm from "@/components/CommunityForm"
import { redirect } from "next/navigation";

const page = async () => {
    const session = await auth();

    if (!session) redirect('/');
    return (
        <>
            <section className="grey_container !min-h-[230px] " >
                <h1 className="heading"> Create Your Community </h1>
            </section>

            <CommunityForm />
        </>
    )
}

export default page