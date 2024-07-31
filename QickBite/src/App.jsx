import React from "react"
import './index.css'
import { LogIn,SignUp,Home } from './parts'
import { BrowserRouter as Router, Route, Routes ,useLocation } from 'react-router-dom';
import PageTransition from './PageTransition';
function App() {
  const location = useLocation();

  return (
    <PageTransition location={location}>
      <Routes location={location}>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/LogIn.jsx" element={<LogIn />} />
        <Route path="/Home.jsx" element={<Home />} />
      </Routes>
    </PageTransition>
  );
}

export default App;