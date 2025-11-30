
import React, { useEffect, useState } from "react"
import { getCountries, startSearchPrices } from "../api/api.js"
import "../css/SearchForm.scss"
import SearchInput from "../components/SearchInput"
import Dropdown from "../components/Dropdown"
import { FormContext } from "../components/context"
import { Country, Item } from "../components/models"
import { Link } from "react-router-dom"


const SearchPage: React.FC = () =>  {

    const [defaultList, setDefaultList] = useState<Country[]>([])

    useEffect(() => {       
        const fetchDefaultList = async () => {
            const res: Response = await getCountries()
            const data: Record<string, Country> = await res.json()
            setDefaultList(Object.values(data))           
        }
        fetchDefaultList()
    },[])


    const SearchForm: React.FC = () => {

        const [isDropdownVisible, setIsDropdownVisible] = useState(Boolean)
        const [searchResults, setSearchResults] = useState<Item[]>([])
        const [searchTarget, setSearchTarget] = useState<Item | null>(null)

        // const startSearch = async (countryId: string) => {
        //     const res = await startSearchPrices(countryId)
        //     const data = await res.json()
        //     console.log(data)
        // }

        const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {        
            console.log(searchTarget)
            e.preventDefault()            
            // startSearch(searchTarget.countryId)
        }

        return (
        <FormContext.Provider 
        value={{
            isDropdownVisible, 
            setIsDropdownVisible, 
            searchResults, 
            setSearchResults,
            searchTarget,
            setSearchTarget
            }}>
            <form onSubmit={(e) => handleFormSubmit(e)}>
            <h2>Форма пошуку турів</h2>
                {searchTarget && <div 
                    className="target-item-wrapper" 
                    onClick={() => setSearchTarget(null)}
                >
                    <p>{searchTarget.name}</p>
                    <span >X</span>
                </div>}
                {searchTarget === null && <SearchInput/>}               
                {isDropdownVisible === true && <Dropdown itemsList={searchResults.length === 0 ? defaultList : searchResults}/>}          

                    <button>Знайти</button> 
            
            </form>
           </FormContext.Provider>
        )
    }
    return (
    <>
        <SearchForm/>
    </>
  );
}

export default SearchPage;