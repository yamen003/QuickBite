import React from 'react'
import Navbar from './homecomponents/Navbar'
import Hero from './homecomponents/Hero'
import Dishes from './homecomponents/Dishes'
import About from './homecomponents/About'
import Reviews from './homecomponents/Reviews'
import Footer from './homecomponents/Footer'
function Home() {
  return (
    <div>
    <main>
      <div>
        <Navbar>
          
        </Navbar>
      </div>
      <div id="hero">
        <Hero></Hero>
      </div>
      <div id='dishes'>
        <Dishes></Dishes>
      </div>
      <div id="about">
        <About></About>
      </div>
      <div id="review">
        <Reviews></Reviews>
      </div>
      <div id='footer'>
      <Footer></Footer>
      </div>
    </main>
    </div>
  )
}

export default Home