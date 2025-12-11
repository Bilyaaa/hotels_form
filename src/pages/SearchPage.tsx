
import React, { useEffect, useState, useRef } from "react"
import { getCountries, startSearchPrices, getSearchPrices, getHotels } from "../api/api.js"
import "../css/SearchForm.scss"
import SearchInput from "../components/SearchInput"
import Dropdown from "../components/Dropdown"
import { FormContext } from "../components/context"
import { Country, HotelInfo, Item } from "../components/models"
import CardsContainer from "../components/CardsContainer"


const SearchPage: React.FC = () =>  {

    const [defaultList, setDefaultList] = useState<Country[]>([])
    const isSearching = useRef(false)
    const searchPrices = useRef([])
    const countryId = useRef<string>('')
    const activeToken = useRef('')
    const [hotels, setHotels] = useState<HotelInfo[]>([])
    const [tours, setTours] = useState<object[]>([])

    useEffect(() => {       
        const fetchDefaultList = async () => {
            const res: Response = await getCountries()
            const data: Record<string, Country> = await res.json()
            setDefaultList(Object.values(data))           
        }
        fetchDefaultList()
    },[])

    useEffect(() => {
        const res = Object.values(searchPrices)
        const prices = Object.values(res[0])
        const filteredItems: Array<object> = []
        const targetCountry =  defaultList.find((country) => {return country.id === countryId.current})
        for (let i = 0; i < hotels.length; i++) {
            for(let j = 0; j < prices.length; j++) {
                if (hotels[i].id === Number(prices[j].hotelID)) {
                    filteredItems.push({hotelInfo: hotels[i], priceInfo: prices[j], countryInfo: targetCountry})
                }
            }
        }
        setTours(filteredItems)
    }, [hotels])

    const SearchForm: React.FC = () => {

        const [isDropdownVisible, setIsDropdownVisible] = useState(Boolean)
        const [searchResults, setSearchResults] = useState<Item[]>([])
        const [searchTarget, setSearchTarget] = useState<Item | null>(null)
        const [messageWindow, setMessageWindow] = useState({isVisible: false, message: ""})
        const searchTimeout = useRef<number | null>(null);  
        
        const getHotelsList = async (countryId: string) => {
            const res = await getHotels(countryId)
            const data = await res.json()
            setHotels(Object.values(data))
        }

        const startSearch = async (searchTarget: Item | null) => {
            if (searchTarget === null) {
                setTimeout(() => isSearching.current = false, 0 ) 
                setMessageWindow({isVisible: true, message: "За вашим пошуком турів не знайдено"})
                setTimeout(() => {
                    setMessageWindow({isVisible: false, message: ""})
                }, 2000) 
                return
            }
            setMessageWindow({isVisible: true, message: "пошук..."})
            let id
            searchTarget.countryId ? id = searchTarget.countryId : id = searchTarget.id
            countryId.current = id
            const res = await startSearchPrices(id)
            if (res.status !== 200) console.log('error')
            const data = await res.json()  
            const token = data.token
            activeToken.current = data.token
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
                        console.log(countryId.current)
                        getHotelsList(countryId.current)
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
        {tours.length > 0 && <CardsContainer cardsList={tours}/>}
    </>
  );
}

export default SearchPage;