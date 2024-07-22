import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { CheckStatusAdmin } from '../components/admin/payment/checkStatus.jsx'
import Sidebar from '../components/Elements/sidebar.jsx/index.jsx'

export const AdminHistoryPage = () => {
  const [history, setHistory] = useState([])
  const getHistory = async () => {
    
    const response = await axios.get(
      import.meta.env.VITE_API_URL + '/paymentadmin'
      

    )
    console.log(response.data.data)
    setHistory(response.data.data)
  }
  useEffect(() => {
    getHistory()
  }, [])

  return (
    <Fragment>
      <div className="flex flex-wrap" > 
      <Sidebar/>

      <div className="bg-white p-8">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold">History Transaction</h2>
            <span className="text-xs">All products item</span>
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
                      products
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
                    history.map(data => (
                      <tr>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-full h-full rounded-full"
                                src={data.itemDetails[0].Product.url}
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {data.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {data.itemDetails[0].Product.name}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {FormattedDate(data.updatedAt)}
                          </p>
                        </td>

                        <CheckStatusAdmin
                          status={data.transaction_status}
                          idPayment={data.id}
                        />
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Fragment>
  )
}

function FormattedDate(dateString) {
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
