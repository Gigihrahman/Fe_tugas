import { useState,useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { useNavigate } from 'react-router-dom'


export const Coba =()=>{
     const navigate = useNavigate()
      // const timer = setTimeout(() => {
      //   navigate('/')
      // }, 5000) 

    //  useEffect(() => {
    //    // Set a timer to navigate to another page after 10 seconds
    //   // 10000 milliseconds = 10 seconds
    //   timer
    //    // Clean up the timer if the component is unmounted before the time is up
      
    //  }, [navigate])



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
    <div class="flex items-center justify-center h-screen">
      <div class="p-4 rounded shadow-lg ring ring-indigo-600/50">
        <div class="flex flex-col items-center space-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-green-600 w-28 h-28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 class="text-4xl font-bold">Thank You !</h1>
          <p>
            Thank you for purchasing!{' '}
            <span className="bold text-blue-500"> wait for 5 second to direct homepage</span>
          </p>
          
        </div>
      </div>
    </div>
  )


}




export default Coba