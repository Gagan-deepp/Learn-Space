import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const CommunitySelect = ({ community , setCommunity, communities }) => {

    return (
        <Select value={community} onValueChange={(value) => setCommunity(value)} >
            <SelectTrigger className="startup-form_select">
                <SelectValue placeholder="Select a Community" />
            </SelectTrigger>
            {communities?.length > 0 ? (
                <SelectContent className="select_content" >
                    {communities.map((community) => (
                        <SelectItem className="select_item" value={community?._id} key={community?._id} > {community?.title} </SelectItem>
                    ))}
                </SelectContent>) : ""}
        </Select>

    )
}

export default CommunitySelect