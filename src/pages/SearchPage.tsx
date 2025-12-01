
import React, { useEffect, useState, useRef } from "react"
import { getCountries, startSearchPrices, getSearchPrices } from "../api/api.js"
import "../css/SearchForm.scss"
import SearchInput from "../components/SearchInput"
import Dropdown from "../components/Dropdown"
import { FormContext } from "../components/context"
import { Country, Item } from "../components/models"
import { Link } from "react-router-dom"


const SearchPage: React.FC = () =>  {

    const [defaultList, setDefaultList] = useState<Country[]>([])
    const isSearching = useRef(false)
    const searchPrices = useRef([])

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
        const [activeToken, setActiveToken] = useState("")
        const [messageWindow, setMessageWindow] = useState({isVisible: false, message: ""})
        const searchTimeout = useRef<number | null>(null);        

        const startSearch = async (searchTarget) => {
            if (searchTarget === null) {
                setTimeout(() => isSearching.current = false, 0 ) 
                setMessageWindow({isVisible: true, message: "За вашим пошуком турів не знайдено"})
                setTimeout(() => {
                    setMessageWindow({isVisible: false, message: ""})
                }, 2000) 
                return
            }
            setMessageWindow({isVisible: true, message: "пошук..."})
            let countryId
            searchTarget.countryId ? countryId = searchTarget.countryId : countryId = searchTarget.id
            const res = await startSearchPrices(countryId)
            if (res.status !== 200) console.log('error')
            const data = await res.json()  
            const token = data.token
            setActiveToken(data.token)
            const waitTime = (new Date(data.waitUntil).getTime()) - Date.now()
            setTimeout(() => {
                let tries = 0
                const getSearchP = async () => {
                    const res = await getSearchPrices(token)
                    const data = await res.json()
                    isSearching.current = false
                    setMessageWindow({isVisible: true, message: "Пошук триває..."})
                    if (Object.keys(data.prices).length === 0 && tries < 2) {
                        tries++
                        searchTimeout.current = setTimeout(() => {
                            getSearchP()
                        }, waitTime)
                    } else if (Object.keys(data.prices).length !== 0) {
                        setMessageWindow({isVisible: false, message: ""})
                        searchPrices.current = data.prices
                        return
                    }
                    else {   
                        searchPrices.current = data.prices                   
                        setMessageWindow({isVisible: true, message: "Сталась помилка"}) 
                        setTimeout(() => {
                            setMessageWindow({isVisible: false, message: ""})
                        }, 2000)                       
                    }
                }
                getSearchP()
            }, waitTime)
        }

        const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {        
            e.preventDefault()            
            startSearch(searchTarget)
            isSearching.current = true
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
            <form onSubmit={(e) => {handleFormSubmit(e) }}>
            {isSearching.current === true && (<div className="disable-form"></div>)}
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
                    {messageWindow.isVisible === true && <div className="message">{messageWindow.message}</div>}            
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