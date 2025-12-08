import React from "react";
import { Link } from "react-router-dom";
import "../css/CardsContainer.scss"
import { TourInfo } from "./models";


const CardsContainer: React.FC = (props) => {


    const list: TourInfo[] = props.cardsList
    console.log(list)

    return(
        <div className="cards-container">
            {list.map((card) => (
                <div className="card" key={card.hotelInfo.id}>
                    <img src={card.hotelInfo.img} alt="hotel image" />
                    <h4> {card.hotelInfo.name}</h4>
                    <p><img  className="flag" src={card.countryInfo.flag} alt="country flag" />{card.hotelInfo.countryName}, {card.hotelInfo.cityName}</p>
                    <h5>Тур стартує: {card.priceInfo.startDate}</h5>
                    <h4>{card.priceInfo.amount} {card.priceInfo.currency}</h4>
                    <Link to={{ pathname: "/hotel", search: `?id=${card.hotelInfo.id}` }}>Відкрити ціну</Link>
                </div>
            ))}
        </div>
    )
}


export default CardsContainer