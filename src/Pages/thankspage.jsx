
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const ThanksPage = ()=>{
  const navigate = useNavigate()
  const timer = setTimeout(() => {
    navigate('/')
  }, 5000)

   useEffect(() => {     
    localStorage.removeItem("cart")
    timer
    
    

   }, [navigate])

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
            <span className="bold text-blue-500">
              {' '}
              wait for 5 second to direct homepage
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}