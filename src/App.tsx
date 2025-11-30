import React from "react"
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import './App.css';
import SearchPage from "./pages/SearchPage";
import HotelPage from "./pages/HotelPage";

const App:React.FC = () =>  {
  return (
    <Router>
      <div className="App"> 
      <Routes>
        <Route path="/" Component={SearchPage}/>
        <Route path="/hotel" Component={HotelPage}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
