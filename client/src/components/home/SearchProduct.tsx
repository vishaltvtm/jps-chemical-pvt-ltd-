
export default function SearchProduct({search,setSearch}:any) {

    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Search by name, code, HSN, CAS..."
                    className="mb-4 w-full border p-2 rounded-lg"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </>
    )
}