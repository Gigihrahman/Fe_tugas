import { useState,useEffect } from "react";



export const Coba =()=>{
    



     useEffect(()=>{
    const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const clientKey = import.meta.env.VITE_CLIENT_KEY;
    const script = document.createElement('script')
    script.src= snapScript;
    script.setAttribute('data-client-key',clientKey)
    script.async= true;
    document.body.appendChild(script)

    return()=>{
      document.body.removeChild(script)
    }

  },[])
  const checkOut= async()=>{
    const token = 'd770caaa-f517-4203-814e-fb41544f719a'
    window.snap.pay(token, {
      onSuccess: function (result) {
        console.log('success')
        console.log(result)
      },
      onPending: function (result) {
        console.log('pending')
        console.log(result)
      },
      onError: function (result) {
        console.log('error')
        console.log(result)
      },
      onClose: function () {
        console.log('customer closed the popup without finishing the payment')
      }
    })
     
  
  }

  return (
    <div>
        <button className="bg-blue-500 text-blue-600 text-3xl" onClick={()=>checkOut()}>
                nyoba dong
            </button>




    </div>



  )


}

