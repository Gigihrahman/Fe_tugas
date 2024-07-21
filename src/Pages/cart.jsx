import  { useEffect, useState } from 'react'
import axios from 'axios'
export const CartPage = () => {

  const [products,setProducts]= useState([])
  const [cart,setCart]= useState([])
  const [totalPrice,setTotalPrice]= useState(0)
  const [ongkir, setOngkir] = useState(0)



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

  const checkout= async()=>{
    const url = import.meta.env.VITE_API_URL
    const token= localStorage.getItem('token')
   
    const response = await axios.post(url+'/order',{
      cart:cart
    },{headers:{
          token:token

              }})
              // const requestData = await response.json();
              console.log(response.data.token)
              window.snap.pay(response.data.token)
     
  }

  const getData =async()=>{
        
        
        try {
          const response = await axios.post(
            import.meta.env.VITE_API_URL + '/productscart',
            {cart:cart}
          )
          console.log(response.data.product)  
          setProducts(response.data.product)
            
        } catch (error) {
            console.log(error)
        }        
    } 

    const getOngkir = async()=>{
      try {
        
        const token = localStorage.getItem('token')
        const url = import.meta.env.VITE_API_URL
       
      
        
        const data = await axios.post(url + '/ongkir', {

          cart: cart // Stringify cart data for expected

        },{headers:{
          token:token

              }
        } 


        )

       
        setOngkir(data.data.costOngkir)
        
        
      } catch (error) {
        console.log(error)
      }
    }


    
 useEffect(() => {
   setCart(JSON.parse(localStorage.getItem('cart')) || [])
 }, [])

  useEffect(()=>{
    if(cart.length >0)
      
      getData()
      
      

  },[cart])

  useEffect(()=>{
    if (cart.length > 0 && totalPrice >0) {
      console.log(totalPrice)
      getOngkir()}
      
  },[totalPrice])



  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find(product => product.id === item.id)
        return acc + product.price * item.qty
      }, 0)
      setTotalPrice(sum)
      localStorage.setItem('cart', JSON.stringify(cart))
      
      
    }
  }, [ products])

  const increaseItem = id => {
    if (cart.find(item => item.id === id)) {
      setCart(
        cart.map(item =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      )
    } else {
      setCart([...cart, { id, qty: 1 }])
    }
  }
  const decreaseItem = (id) => {
  // Efficiently find the item's index using findIndex
  const index = cart.findIndex(item => item.id === id);

  if (index !== -1) { // Item found
    const newQuantity = Math.max(cart[index].qty - 1, 0); // Ensure minimum quantity is 0
    const updatedCart = [...cart]; // Create a copy to avoid mutation

    if (newQuantity === 0) {
      // Remove item if quantity becomes zero
      updatedCart.splice(index, 1);
    } else {
      // Update quantity if not zero
      updatedCart[index].qty = newQuantity;
    }

    setCart(updatedCart); // Update state with the modified cart
  } else {
    // Item not found, add with quantity 1
    setCart([...cart, { id, qty: 1 }]);
  }
};




  return (
    <div className="bg-gray-100 h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
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
                  {products.length > 0 &&
                    cart.map(item => {
                      const product = products.find(
                        product => product.id === item.id
                      )
                      return (
                        <tr key={item.id}>
                          <td className="py-4">
                            <div className="flex items-center">
                              <img
                                className="h-16 w-16 mr-4"
                                src={product.url}
                                alt="Product image"
                              />
                              <span className="font-semibold">
                                {product.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-4">{product.price}</td>

                          <td className="py-4">
                            <div className="flex items-center">
                              <button className="border rounded-md py-2 px-4 mr-2" onClick={()=>decreaseItem(item.id)}>
                                -
                              </button>
                              <span className="text-center w-8">
                                {item.qty}
                              </span>
                              <button className="border rounded-md py-2 px-4 ml-2" onClick={()=>increaseItem(item.id)}>
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4">{product.berat*item.qty}</td>
                          <td className="py-4">{item.qty * product.price}</td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{totalPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>$1.99</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>{ongkir}</span>
              </div>
              <div className="my-2">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">{totalPrice+ongkir}</span>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full" onClick={()=>checkout()}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


