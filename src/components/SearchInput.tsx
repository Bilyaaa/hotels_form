
import React, { useMemo } from "react";
import { useContext, useRef } from "react";
import { FormContext } from "../components/context";
import { searchGeo } from "../api/api.js"

const SearchInput: React.FC = () => {

    const context = useContext(FormContext);
    const searchTimeout = useRef<number | null>(null);

    const fetchResults = async (value: string) => {
        const res: Response = await searchGeo(value)
        const data = await res.json()
        context.setSearchResults(Object.values(data))
    }   
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value        
        if (searchTimeout.current) clearTimeout(searchTimeout.current)
        if (value === "") {
            context.setSearchResults([])
        } else {
            searchTimeout.current = setTimeout(() => {
                fetchResults(value)
            }, 400) 
        }
    }  

    const handleInputClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault()
        context.setIsDropdownVisible(true)
        if (e.currentTarget.value.length > 0) {
            return
        } else {
            context.setSearchResults([])
        }      
    }

    return (
        <>
            <input 
                id="#search-input"
                type="text" 
                onChange={(e) => handleInputChange(e)}
                onClick={(e) => handleInputClick(e)}                
            />
        </>
    )
}

export default SearchInput