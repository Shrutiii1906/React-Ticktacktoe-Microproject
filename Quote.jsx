import React,{useEffect,useState} from 'react'
import axios from 'axios';
import './quote.css'

function Quote(){
    const [data,setData]=useState()
// useEffect(()=>{
//   setTimeout(()=>{
//       axios.get('https://api.adviceslip.com/advice')
//       .then(function (response) {
//         // handle success
//         setData(response.data.slip)
//         console.log(data)
//       })
//       .catch(function (error) {
//         // handle error
//         console.log(error);
//       })a
//     },2000)},[])
    const MINUTE_MS = 1000;
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get('https://api.adviceslip.com/advice')
  .then(function (response) {
    // handle success
    setData(response.data.slip)
    console.log(data)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });}, MINUTE_MS);
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
      }, [data])
  return (
<>
    <div className='quote'>
      <h3>Quote #1</h3>
      <p>hhjjj</p>
      <div className='blue'>
        <img className='group' src="/fileimage/Group.svg" alt="" />
      </div>
    </div>
</>
  )
}

export default Quote