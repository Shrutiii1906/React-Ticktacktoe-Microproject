import { useState } from 'react'
import './App.css'
import Mobilein from './Mobilein.jsx'
import Quote from './Quote.jsx'

function App() {

  return (
    <>
    <div className='mainContainer'>
      <Quote />
      <Mobilein />
      <div className="filler"></div>
      
    </div>
    
    </>
  )
}

export default App