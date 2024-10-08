import { useEffect,useState } from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";
import { FaCashRegister } from 'react-icons/fa6'
import Button from "../components/Elements/Button/index.jsx";
import { StatusPayment } from "../components/Elements/detailPayment/statusPayment.jsx";

export const DetailPaymentUser = ()=>{
    const { id } = useParams()
    const [products, setProducts] = useState([])
    const [history, setHistory] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [provinceCode, setProvinceCode] = useState(0)
    const [provinceName, setProvinceName] = useState('')
    const [cityCode, setcityCode] = useState(0)
    const [cityName, setCityName] = useState('')
    const [subdistrictCode, setSubdistrictCode] = useState(0)
    const [subdistrictName, setSubdistrictName] = useState('')
   
    const getData =async ()=>{
        const response = await axios.post(import.meta.env.VITE_API_URL+'/detailPaymentUser/'+id)
        console.log(response)
        setHistory(response.data.data)
        const data = response.data.data[0]
        setProvinceCode(data.recipient_province)
        setcityCode(data.recipient_district)
        setSubdistrictCode(data.recipient_subdistrict)
        setHistory(response.data.data)


    }

     useEffect(() => {
       const snapScript = import.meta.env.VITE_SNAPJS
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
     useEffect(() => {
       const fetchaddressname = async () => {
         try {
           const response = await axios.get(
             `${import.meta.env.VITE_API_URL}/spesifik?id=${subdistrictCode}`
           )

           setProvinceName(response.data.rajaongkir.results.province)
           setCityName(response.data.rajaongkir.results.city)
           setSubdistrictName(response.data.rajaongkir.results.subdistrict_name)
         } catch (error) {
           console.error('Error fetching province name:', error)
         }
       }
       if (subdistrictCode > 0) {
         fetchaddressname()
       }
     }, [subdistrictCode])

    return (
      <div>
        {history.map(data => (
          <div className="bg-gray-100 h-screen py-8">
            <div className="container mx-auto px-4">
              <h1>
                {' '}
                <a className="text-3xl font-extrabold" href="/products">
                  {' '}
                  &#8592;
                </a>
              </h1>
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
                          <th className="text-left font-semibold">Weight(g)</th>
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
                            <td className="py-4">
                              {item.total_price?.toLocaleString('id-ID', {
                                style: 'currency',
                                currency: 'IDR'
                              })}
                            </td>

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
                            <td className="py-4">
                              {' '}
                              {(
                                item.total_price * item.quantity
                              ).toLocaleString('id-ID', {
                                style: 'currency',
                                currency: 'IDR'
                              })}
                            </td>
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
                        <span className="font-semibold">
                          Total With Shipping
                        </span>
                        <span className="font-semibold">
                          {data.gross_amount?.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                          })}
                        </span>
                      </div>
                      <div className="flex flex-col justify-between mb-2">
                        <span className="font-semibold">Pengiriman :</span>
                        <span>Name: {data.recipient_name}</span>
                      </div>
                      <div className="flex flex-col justify-between mb-2">
                        <span className="font-semibold"> Alamat Penerima:</span>
                        <span>{'  ' + data.recipient_fulladdress}</span>
                      </div>
                      <div className="flex flex-col justify-between mb-2">
                        <span className="font-semibold"> Provinsi:</span>
                        <span> {provinceName} </span>
                      </div>
                      <div className="flex flex-col justify-between mb-2">
                        <span className="font-semibold"> Kabupaten:</span>
                        <span>{cityName}</span>
                      </div>
                      <div className="flex flex-col justify-between mb-2">
                        <span className="font-semibold"> Kecamatan:</span>
                        <span>{subdistrictName}</span>
                      </div>
                      <div className="flex flex-col justify-between mb-2">
                        <span className="font-semibold"> Nomer HP:</span>
                        <span>{data.recipient_phoneNumber}</span>
                      </div>

                      {
                        <StatusPayment
                          status={data.transaction_status}
                          onClick={() => {
                            snapPay(data.token)
                          }}
                        ></StatusPayment>
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

