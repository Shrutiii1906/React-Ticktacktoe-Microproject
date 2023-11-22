import React from 'react'
import './Mobile.css'
function Mobilein() {
  return (
    <>
    <div className="mobile">
      <img className='monkey' src="./fileimage/Monkey.svg" alt="" />
      <img className='vector' src="./fileimage/Vector.svg" alt="" />
      <div className="small">
        <h2>PICK PLAYER </h2>
        <div className="buttoncomp">
          <button>
            <img src="./fileimage/c.svg" alt="" />
          </button>
          <button>
            <img src="./fileimage/bo.svg" alt="" />
          </button>
        </div>
      </div>
      <button className='yellowb'>NEW GAME ( VS CPU )</button>
      <button className='blueb'>NEW GAME ( VS HUMAN ) Coming soon</button>
      <button className='yellowb1'>Invite your friend</button>
    </div>
    </>
    
  )
}

export default Mobilein