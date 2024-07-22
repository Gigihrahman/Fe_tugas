import { useEffect,useState } from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";
import { FaCashRegister } from 'react-icons/fa6'
import Button from "../components/Elements/Button/index.jsx";
import { StatusPayment } from "../components/Elements/detailPayment/statusPayment.jsx";

export const DetailPaymentUser = ()=>{
    const { id } = useParams()
    const [products,setProducts]=useState([]);
    const [history,setHistory] = useState([])
    const [totalPrice,setTotalPrice] = useState(0)
    const getData =async ()=>{
        const response = await axios.post(import.meta.env.VITE_API_URL+'/detailPaymentUser/'+id)
        console.log(response)
        setHistory(response.data.data)


    }

     useEffect(() => {
       const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js'
       const clientKey = import.meta.env.VITE_CLIENT_KEY
       const script = document.createElement('script')
       script.src = snapScript
       script.setAttribute('data-client-key', clientKey)
       script.async = true
       document.body.appendChild(script)

       return () => {
         document.body.removeChild(script)
       }
     }, [])

    const snapPay = (token)=>{
       window.snap.pay(token)
    }
    const getProducts = async ()=>{
        if(history.length > 0){
            const idProduct = [];
            history.map((data)=>(
                idProduct.push(data.product_id)
            ))
            console.log(idProduct)

            
        }    }

       

    useEffect(()=>{
        getData()
        getProducts()

    },[])
    // useEffect(()=>{
    //     if(history.length > 0){
    //       calculateTotalPrice()
    //     }
    // },[history])

    return (
      <div>
        {history.map(data => (
          <div className="bg-gray-100 h-screen py-8">
            <div className="container mx-auto px-4">
              <h1 className="text-2xl font-semibold mb-4">The Transaction</h1>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-3/4">
                  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left font-semibold">Product</th>
                          <th className="text-left font-semibold">Price</th>
                          <th className="text-left font-semibold">Quantity</th>
                          <th className="text-left font-semibold">Weight</th>
                          <th className="text-left font-semibold">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.itemDetails.map(item => (
                          <tr>
                            <td className="py-4">
                              <div className="flex items-center">
                                <img
                                  className="h-16 w-16 mr-4"
                                  src={item.Product.url}
                                  alt="Product image"
                                />
                                <span className="font-semibold">
                                  {item.Product.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-4">{item.total_price}</td>

                            <td className="py-4">
                              <div className="flex items-center">
                                <span className="text-center w-8">
                                  {item.quantity}
                                </span>
                              </div>
                            </td>

                            <td className="py-4">
                              {item.quantity * item.Product.berat}
                            </td>
                            <td className="py-4"> {data.gross_amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="md:w-1/4">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <FaCashRegister size={50} />

                    <div className="my-2">
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">
                          {data.gross_amount}
                        </span>
                      </div>
                      {data.status}
                     {
                      
                      <StatusPayment status={data.transaction_status} onClick = {()=>{snapPay(data.token)}}></StatusPayment>
                     }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

