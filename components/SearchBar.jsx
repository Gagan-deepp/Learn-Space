import Form from "next/form"
import SearchReset from "./SearchReset"
import { Search } from "lucide-react"

const SearchBar = ({ search }) => {
    return (
        <Form action="/" scroll={false} className="search-form" >
            <input
                name="search"
                defaultValue={search}
                className="search-input"
                placeholder="Search Communities..."
            />

            <div className="flex gap-2" >
                {search && <SearchReset />}

                <button type="submit" className="search-btn text-white" >
                    <Search className="font-extrabold" />
                </button>
            </div>
        </Form>
    )
}

export default SearchBar
