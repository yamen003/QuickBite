import React from "react"
import './index.css'
import { LogIn,SignUp,Home } from './parts'
import { BrowserRouter as Router, Route, Routes ,useLocation } from 'react-router-dom';
import PageTransition from './PageTransition';
import Navbar from "./parts/homecomponents/Navbar";
import ConfOrder from "./parts/homecomponents/ConfOrder";
import Cart from "./parts/homecomponents/Cart";
import Profile from "./parts/homecomponents/Profile";
function App() {
  const location = useLocation();

  return (
    <PageTransition location={location}>
      <Routes location={location}>
        <Route path="/" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Home.jsx" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/order-confirmation" element={<ConfOrder/>}/>
      </Routes>
    </PageTransition>
  );
}

export default App;