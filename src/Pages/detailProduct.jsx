import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getDetailProduct } from "../services/product.service.js";
import { ToastCart } from "../components/Elements/toast/cartToast.jsx";
const DetailProductPage = ()=>{
    const {id}= useParams();
    const [cart, setCart] = useState([])
    const [product,setProduct]= useState({})
    useEffect(()=>{
        getDetailProduct(id,(data)=>{setProduct(data)})
    },[id])
    useEffect(() => {
      setCart(JSON.parse(localStorage.getItem('cart')) || [])
    }, [])
    const handleAddToCart = id => {
      if (cart.find(item => item.id === id)) {
        setCart(
          cart.map(item =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
          )
        )
        console.log(cart)
        localStorage.setItem('cart', JSON.stringify(cart))
      } else {
        setCart([...cart, { id, qty: 1 }])
      }
    }
    useEffect(() => {
      if (cart.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cart))
      }
    }, [cart])
    console.log(product)
    return (
      <div className="w-100 min-h-screen flex justify-center items-center ">
        <h1>
          {' '}
          <a
            className="text-3xl font-extrabold fixed top-5 left-5"
            href="/products"
          >
            {' '}
            &#8592;
          </a>
        </h1>
        {Object.keys(product).length > 0 && (
          <div className="flex font-sans max-w-xl m-3 border-4">
            <div className="flex-none w-48 relative">
              <img
                src={product.url}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <form className="flex-auto p-6">
              <div className="flex flex-wrap">
                <h1 className="flex-auto text-lg font-semibold text-slate-900">
                  {product.name}
                </h1>
                <div className="text-lg font-semibold text-slate-500">
                  {product?.price.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                  })}
                </div>
              </div>
              <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                <div className="space-x-2 flex text-sm">
                  {product.description}
                </div>
              </div>
              <div className="flex space-x-4 mb-6 text-sm font-medium">
                <div className="flex-auto flex space-x-4">
                  <button
                    className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
                    type="button"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to bag
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        <ToastCart total={cart.length} />
      </div>
    )
}

export default DetailProductPage
