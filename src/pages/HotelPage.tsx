

import React from "react"
import { useLocation } from "react-router-dom";

const HotelPage:React.FC = () =>  {

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const itemId = params.get("id")
  return (
    <div>
      <h1>{itemId}</h1>
    </div>
  );
}

export default HotelPage;