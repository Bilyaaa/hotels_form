
export interface Item {
    name: string,
    id: string, 
    countryId?: string,
    img?: string,
    flag? :string
}

export interface Country {
    name: string,
    id: string,
    flag: string
} 

export interface HotelInfo {
    cityId: number,
    cityName: string,
    countryId: string,
    countryName: string,
    id: number,
    img: string,
    name: string,
    description?: string,
    services: string
}

export interface PriceInfo {
    amount: number,
    currency: string,
    endDate: string,
    hotelID: string,
    id: string,
    startDate: string
}

export interface TourInfo {
    hotelInfo: HotelInfo,
    priceInfo: PriceInfo,
    countryInfo: Country
}

export interface CardContainerProps {
    cardsList: TourInfo[]
}

