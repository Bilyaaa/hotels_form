import React from "react";
import { Link } from "react-router-dom";
import "../css/CardsContainer.scss"
import { TourInfo, CardContainerProps } from "./models";
import locationImg from "../img/location.png"
import cityImg from "../img/city.png"
import wifiImg from "../img/wifi.png"
import parkingImg from "../img/parking.png"
import tennisImg from "../img/tennis.png"
import laundryImg from "../img/laundry.png"
import aquaparkImg from "../img/aquapark.png"
import dateImg from "../img/date.png"


const CardsContainer: React.FC<CardContainerProps> =  ({ cardsList }) => {

    const list: TourInfo[] = cardsList
    return(
        <div className="cards-container">
            {list.map((card) => (
                <div className="card" key={card.hotelInfo.id}>
                    <h4 className="extended-info hotel-name"> {card.hotelInfo.name}</h4>
                    <div className="extended-info location-wrapper">
                        <img className="extended-info location-img" src={locationImg} alt="location" />
                        <h5 className="extended-info" >{card.hotelInfo.countryName}</h5>
                        <img className="extended-info city-img" src={cityImg} alt="city" />
                        <h5 className="extended-info" >{card.hotelInfo.cityName}</h5>
                    </div>
                    <img className="extended-info" src={card.hotelInfo.img} alt="hotel" />
                    <div className="extended-info hotel-description">
                        <h4 className="extended-info">Опис</h4>
                        <h5 className="extended-info">{card.hotelInfo.description}</h5>
                    </div>
                    <h4 className="extended-info">Сервіси</h4>
                    <div className="extended-info services-wrapper">
                        {card.hotelInfo.services?.wifi === "yes" && (<div className="extended-info"><img className="extended-info wifi-img" src={wifiImg} alt="wifi" /><h5 className="extended-info">WIFI</h5></div>)}
                        {card.hotelInfo.services?.parking === "yes" && (<div className="extended-info"><img className="extended-info parking-img" src={parkingImg} alt="parking" /><h5 className="extended-info">Parking</h5></div>)}
                        {card.hotelInfo.services?.tennis_court === "yes" && (<div className="extended-info"><img className="extended-info tennis-img" src={tennisImg} alt="tennis" /><h5 className="extended-info">Tennis</h5></div>)}
                        {card.hotelInfo.services?.laundry === "yes" && (<div className="extended-info"><img className="extended-info laundry-img" src={laundryImg} alt="laundry" /><h5 className="extended-info">Laundry</h5></div>)}
                        {card.hotelInfo.services?.aquapark === "yes" && (<div className="extended-info"><img className="extended-info aquapark-img" src={aquaparkImg} alt="aquapark" /><h5 className="extended-info">Aquapark</h5></div>)}
                    </div>
                    <div className="extended-info date-wrapper">
                        <img className="extended-info date-img" src={dateImg} alt="date"/><h5 className="extended-info">{card.priceInfo.startDate}</h5>
                    </div>
                    <div className="extended-info price-wrapper">
                        <h4 className="extended-info">{card.priceInfo.amount} {card.priceInfo.currency}</h4><Link className="extended-info extended-btn" to={{ pathname: "/hotel", search: `?hotelId=${card.hotelInfo.id}&priceId=${card.priceInfo.id}` }}>Відкрити ціну</Link>
                    </div>
                    <img src={card.hotelInfo.img} alt="hotel" />
                    <h4> {card.hotelInfo.name}</h4>
                    <p>{card.countryInfo?.flag && <img className="flag" src={card.countryInfo.flag} alt="country flag" />} {card.hotelInfo.countryName}, {card.hotelInfo.cityName}</p>
                    <h5>Тур стартує: {card.priceInfo.startDate}</h5>
                    <h4>{card.priceInfo.amount} {card.priceInfo.currency}</h4>
                    <Link to={{ pathname: "/hotel", search: `?hotelId=${card.hotelInfo.id}&priceId=${card.priceInfo.id}` }}>Відкрити ціну</Link>
                </div>
            ))}
        </div>
    )
}

export default CardsContainer