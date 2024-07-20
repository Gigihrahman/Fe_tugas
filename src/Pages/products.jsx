
import { Fragment , useState,useEffect} from 'react';
import CardProduct from './../components/Fragments/CardProduct';
import Button from '../components/Elements/Button/index.jsx';
import axios from 'axios';
import { FaRegUser } from 'react-icons/fa'

import { useLogin } from '../hooks/uselogin.jsx';
import { ToastCart } from './../components/Elements/toast/cartToast';

const ProductsPage = ()=>{
    const [cart,setCart] = useState([ ]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [products,setproducts] = useState([]);
    const [currentPage,setcurrentPage]= useState(1);
    const [postPerpage,setPostPerpage]= useState(5);
    const [maxPage, setMaxPage]= useState(0)
    const username = useLogin()

    const handlePage=(page)=>{
        setcurrentPage(page)
    }
    const getProduct = async ()=>{

        try {
             const response = await axios.post(
               'http://localhost:5000/productsview',
               {
                 page: currentPage
               }
             )
            //  console.log(' response dari data api', response)
             const data = await response.data.hasil
            //  console.log('sudah jadi json', data)
             setproducts(data)
             const maxpages = Math.ceil(
               response.data.pagination.totalCount / 10
             )
             setMaxPage(maxpages)

            
            
        } catch (error) {
            console.log(error)
        }
       
        
    }
    useEffect(()=>{
        setCart(JSON.parse(localStorage.getItem("cart"))||[]);
    },[]);
    useEffect(()=>{
    getProduct()
    
    
        },[currentPage])
    
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
    return (
      <Fragment>
        <div className="flex justify-end h-20 bg-blue-600 text-white items-center px-10">
          <FaRegUser />
          {username.username}
          <Button classname="ml-5 bg-black" onClick={handleLogout}>
            Logout
          </Button>
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
                    price={product.price}
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
          {currentPage>1 && <Button
            classname="bg-blue-600"
            onClick={() => {
              handlePage(currentPage - 1)
            }}
          >
            -
          </Button>}

          <p className="text-3xl text-blue-500 px-5">{currentPage}</p>

          {currentPage < maxPage && <Button
            classname="bg-blue-600"
            onClick={() => {
              handlePage(currentPage + 1)
            }}
          >
            +
          </Button>}
        </div>
        <ToastCart total={cart.length} />
      </Fragment>
    )

}

export default ProductsPage;