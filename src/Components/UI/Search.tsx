import { Search as SearchIcon } from "lucide-react"

const Search = ({search, setSearch, placeholder = "Search"}: {search: string, setSearch: (search: string) => void, placeholder?: string}) => {
  return (
    <div className="border border-line gap-4 px-2 h-10 flex items-center bg-background rounded-lg">
        <SearchIcon size={20} className=" text-sub" />
        <input type="text" placeholder={placeholder} className="w-full h-full bg-transparent outline-none text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  )
}

export default Search