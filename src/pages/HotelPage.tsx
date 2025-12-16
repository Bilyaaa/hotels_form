

import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import CardsContainer from "../components/CardsContainer";
import { getPrice, getHotel } from "../api/api.js"
import "../css/HotelPage.scss"

const HotelPage: React.FC = () =>  {

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const hotelId = Number(params.get("hotelId"))
  const priceId = params.get("priceId")
  const [tourDetails, setTourDetails] = useState([])

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const fullInfo = []
        const details = {}
  
        if (priceId) {
          const resPrice = await getPrice(priceId)
          const dataPrice = await resPrice.json()
          details.priceInfo = dataPrice          
          const date = details.priceInfo.startDate
          const [year, month, day] = date.split("-")
          const formatted = `${day}.${month}.${year}`
          details.priceInfo.startDate = formatted
        }
  
        if (hotelId) {
          const resHotel = await getHotel(hotelId)
          const dataHotel = await resHotel.json()
          details.hotelInfo = dataHotel

        }
        fullInfo.push(details)
        setTourDetails(fullInfo)
      } catch (err) {
        console.error(err)
      }
    };
  
    fetchDetails()
  }, []);


  return (
    <>
    <div className="card-wrapper">
      <CardsContainer cardsList={tourDetails}/>
    </div>
    </>
  );
}

export default HotelPage;