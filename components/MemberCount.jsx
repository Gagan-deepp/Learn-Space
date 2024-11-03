import { client } from "@/sanity/lib/client"
import Ping from "./Ping"
import { COMMUNITY_MEMBER_COUNT_QUERY } from "@/sanity/lib/queries"
import { User } from "lucide-react"

const MemberCount = async ({ id }) => {

    const { count } = await client.withConfig({ useCdn: false }).fetch(COMMUNITY_MEMBER_COUNT_QUERY, { id })

    return (
        <div className="view-container" >
            <div className="absolute -top-1 -right-2">
                <Ping />
            </div>

            <p className="view-text" >
                <span className="font-bold font-work-sans flex gap-2" > <User /> : {count} </span>
            </p>
        </div>
    )
}

export default MemberCount
