import { useState,useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'



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
     
  
  


  return (
    
     <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <button class="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <img src="https://via.placeholder.com/20" alt="Icon" className="w-10 h-10 mr-2 rounded-full"/>
            Click Me
        </button>
    </div>
  )


}

