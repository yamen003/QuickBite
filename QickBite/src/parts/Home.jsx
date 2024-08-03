import React from 'react'
import Navbar from './homecomponents/Navbar'
import Hero from './homecomponents/Hero'
import Dishes from './homecomponents/Dishes'
function Home() {
  return (
    <div><Navbar></Navbar>
    <main>
      <div id="hero">
        <Hero></Hero>
      </div>
      <div id="dish">
      <Dishes></Dishes>
      </div>
    </main>
    </div>
  )
}

export default Home