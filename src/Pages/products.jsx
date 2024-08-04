
import { Fragment , useState,useEffect} from 'react';
import CardProduct from './../components/Fragments/CardProduct';
import Button from '../components/Elements/Button/index.jsx';
import axios from 'axios';
import { FaRegUser } from 'react-icons/fa'
import { UserOption } from '../components/Elements/user/option.jsx';

import { useLogin } from '../hooks/uselogin.jsx';
import { ToastCart } from './../components/Elements/toast/cartToast';

const ProductsPage = ()=>{
    const [cart,setCart] = useState([ ]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [products,setproducts] = useState([]);
    const [currentPage,setcurrentPage]= useState(1);
    const [postPerpage,setPostPerpage]= useState(5);
    const [maxPage, setMaxPage]= useState(0)
    const [brand, setBrand] = useState([
      { id: 1, name: 'holaaa' },
      { id: 2, name: 'holii' }
    ])
    const[brandId, setBrandId] = useState(0)
    const username = useLogin()

    const handlePage=(page)=>{
        setcurrentPage(page)
    }
    const getProduct = async ()=>{

        try {
             const response = await axios.get(import.meta.env.VITE_API_URL, {
               params: {
                 page: currentPage,
                 limit: 10
               }
             })
            //  console.log(' response dari data api', response)
             const data = await response.data.hasil
            //  console.log('sudah jadi json', data)
             setproducts(data)
             const maxpages = Math.ceil(
               response.data.pagination.totalCount / 10
             )
             setMaxPage(maxpages)
             console.log(brand)

            
            
        } catch (error) {
            console.log(error)
        }
       
        
    }

    const getBrandData = async()=>{
      const response = await axios.get(import.meta.env.VITE_API_URL+"/merk")
      setBrand(response.data.merk)
    }
    useEffect(()=>{
        setCart(JSON.parse(localStorage.getItem("cart"))||[]);
    },[]);
    useEffect(()=>{
    getProduct()
    getBrandData()
    
    
        },[currentPage])

        const handleProductBrand = (id)=>{
          setBrandId(id)
        }
        const getProductBrand = async()=>{
            const response = await axios.get(import.meta.env.VITE_API_URL+'/productmerk', {
              params: {
                merk: brandId
              }
            })
            console.log(response.data.hasil)
            setproducts(response.data.hasil)

        }
        useEffect(()=>{
          if(brandId > 0){
            getProductBrand()
            console.log(brandId)

          }
        },[brandId])
    
    // useEffect(()=>{
    //     if(products.length >0 && cart.length >0){
    //         const sum = cart.reduce((acc,item)=>{
    //         const product =products.find((product)=>product.id ===item.id);
    //         return acc+product.price * item.qty;
    //     },0);
    //     setTotalPrice(sum);
    //     localStorage.setItem("cart", JSON.stringify(cart))
    //     }

    //      console.log('ini masih product' + products)
    // },[cart,products])

    const handleLogout= ()=>{
        localStorage.removeItem('token');
        window.location.href= "/login";
        

    };
    const handleAddToCart = (id)=>{
        if(cart.find(item=> item.id === id)){
            setCart(
                cart.map(item=> item.id === id ? {...item,qty: item.qty +1}: item)
            )
            console.log(cart)
            localStorage.setItem('cart', JSON.stringify(cart))
        }
        else{
            setCart([...cart,{id,qty:1}])
        }
    }
       useEffect(() => {
        if(cart.length > 0){
          localStorage.setItem('cart', JSON.stringify(cart))

        }

        
       }, [cart])
    return (
      <Fragment>
        <div className="flex justify-end h-20 bg-primary text-white items-center px-10 sticky top-0 z-50">
          <UserOption username={username.username || ' '}></UserOption>
          <a
            className=" w-20 y-10 ml-5 rounded-lg bg-white  fixed top-5 left-5 flex justify-center"
            href="/"
          >
            <p className="text-red-600">Home</p>
          </a>
        </div>
        <div className="py-2  flex flex-col justify-center items-center">
          <h1 className="text-xl text-primary"> The Brand Category</h1>
          <div className="py-5">
            {brand?.map(data => {
              return (
                <button
                  class="relative inline-flex items-center justify-center mx-5 p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                  onClick={() => handleProductBrand(data.id)}
                >
                  <img
                    src={data.url}
                    alt="Icon"
                    class="w-10 h-10 mr-2 object-cover rounded-full"
                  />
                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-opacity-0">
                    {data.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
        <div className="flex justify-center py-5">
          <div className="w-4/6 flex flex-wrap">
            {products.length > 0 &&
              products?.map(product => (
                <CardProduct key={product.id}>
                  <CardProduct.Header image={product.url} id={product.id} />
                  <CardProduct.Body
                    name={product.name}
                    text={product.description}
                  ></CardProduct.Body>
                  <CardProduct.Footer
                    price={product.price.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR'
                    })}
                    id={product.id}
                    handleAddToCart={handleAddToCart}
                  />
                </CardProduct>
              ))}
          </div>

          {/* <div className="w-2/6">
            <h1 className="text-3xl font-bold text-blue-600 ml-5 mb-2">Cart</h1>

            <table className="text-left table-auto border-separate border-spacing-x-5">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
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
                        <td>{product.name}...</td>
                        <td>
                          {product.price.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                          })}
                        </td>
                        <td>{item.qty}</td>
                        <td>
                          {' '}
                          {(item.qty * product.price).toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                          })}
                        </td>
                      </tr>
                    )
                  })}
                <tr>
                  <td colSpan={3}> Total Price</td>
                  <td>
                    {' '}
                    {totalPrice.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR'
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div> */}
        </div>
        <div className="flex flex-wrap justify-center content-between">
          {currentPage > 1 && brandId == 0 && (
            <Button
              classname="bg-blue-600"
              onClick={() => {
                handlePage(currentPage - 1)
              }}
            >
              -
            </Button>
          )}

          {brandId == 0 && (
            <p className="text-3xl text-blue-500 px-5">{currentPage}</p>
          )}

          {currentPage < maxPage && brandId == 0 && (
            <Button
              classname="bg-blue-600"
              onClick={() => {
                handlePage(currentPage + 1)
              }}
            >
              +
            </Button>
          )}
        </div>
        <ToastCart total={cart.length} />
      </Fragment>
    )

}

export default ProductsPage;