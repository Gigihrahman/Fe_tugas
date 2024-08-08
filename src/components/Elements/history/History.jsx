import { useState,useEffect } from "react"
import axios from "axios"
import { CheckStatus } from "./status.jsx"
import { UserOption } from "../user/option.jsx"
import { useLogin } from "../../../hooks/uselogin.jsx"


export const History = ()=>{
    const [history,setHistory]= useState([])
    const username = useLogin()
    const getHistory =async()=>{
        const token = localStorage.getItem("token")
        const response = await axios.get(import.meta.env.VITE_API_URL+'/paymentuser',{headers:{
            token: token
        }})
        console.log(response.data.data)
        setHistory(response.data.data)
    }
    useEffect(()=>{
        getHistory()
        
    },[])


    return (
      <>
        <div className="flex justify-end h-20 bg-primary text-white items-center px-10 sticky top-0 z-50">
          <UserOption username={username.username || ' '}></UserOption>
          <a
            className="w-20 y-10 ml-5 rounded-lg bg-white fixed top-5 left-5 flex justify-center"
            href="/"
          >
            <p className="text-red-600">Home</p>
          </a>
        </div>
        <div className="bg-white p-8 rounded-md w-full">
          <div className="flex items-center justify-between pb-6">
            <div>
              <h2 className="text-gray-600 font-semibold">
                History Transaction
              </h2>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex bg-gray-50 items-center p-2 rounded-md"></div>
            </div>
          </div>
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Id Transaction
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Products
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Created at
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.length > 0 &&
                      history.map(data => {
                        const product = data.itemDetails[0]?.Product

                        return (
                          <tr key={data.id}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 w-10 h-10">
                                  {product?.url && (
                                    <img
                                      className="w-full h-full rounded-full"
                                      src={product.url}
                                      alt={product.name}
                                    />
                                  )}
                                </div>
                                <div className="ml-3">
                                  <div className="text-gray-900 whitespace-no-wrap">
                                    {data.id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="text-gray-900 whitespace-no-wrap">
                                {product?.name || 'Product not available'}
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="text-gray-900 whitespace-no-wrap">
                                {FormattedDate(data.updatedAt)}
                              </div>
                            </td>

                            <CheckStatus
                              status={data.transaction_status}
                              idPayment={data.id}
                            />
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    )


}


function FormattedDate( dateString ) {
  const date = new Date(dateString)

  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  const formattedDate = date.toLocaleDateString('en-US', options)

  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' }
  const formattedTime = date.toLocaleTimeString('en-US', timeOptions)

  return (
    <p>
       {formattedDate} {formattedTime}
    </p>
  )
}