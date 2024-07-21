import { useState,useEffect } from "react";



export const Coba =()=>{
    



  //    useEffect(()=>{
  //   const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';
  //   const clientKey = import.meta.env.VITE_CLIENT_KEY;
  //   const script = document.createElement('script')
  //   script.src= snapScript;
  //   script.setAttribute('data-client-key',clientKey)
  //   script.async= true;
  //   document.body.appendChild(script)

  //   return()=>{
  //     document.body.removeChild(script)
  //   }

  // },[])
  // const checkOut= async()=>{
  //   const token = 'd770caaa-f517-4203-814e-fb41544f719a'
  //   window.snap.pay(token, {
  //     onSuccess: function (result) {
  //       console.log('success')
  //       console.log(result)
  //     },
  //     onPending: function (result) {
  //       console.log('pending')
  //       console.log(result)
  //     },
  //     onError: function (result) {
  //       console.log('error')
  //       console.log(result)
  //     },
  //     onClose: function () {
  //       console.log('customer closed the popup without finishing the payment')
  //     }
  //   })
     
  
  
  const dateString = '2024-07-17T07:24:27.000Z';

  return (   
    <div>
      <FormattedDate dateString={dateString} />
    </div>



  )


}


function FormattedDate({ dateString }) {
  const date = new Date(dateString)

  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  const formattedDate = date.toLocaleDateString('en-US', options)

  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' }
  const formattedTime = date.toLocaleTimeString('en-US', timeOptions)

  return (
    <p>
      Formatted Date: {formattedDate} {formattedTime}
    </p>
  )
}