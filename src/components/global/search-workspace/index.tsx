import React from 'react'
import { useSearch } from '@/hooks/search'
interface Props {
 workspaceId:string    
}

const Search = ({ workspaceId }: Props) => {
    const {searchQuery,onUsers,isFetching,query}=useSearch({
        key:'get-workspace',
        type:"USERS"
    })
    return (
        <div>
            
        </div>
    )
}

export default Search
