import Button from "../Elements/Button/index.jsx"
import { Link } from "react-router-dom";
const CardProduct = (props)=>{
        const {children}= props;
    return(
       <div className="w-full max-w-xs bg-gray-800 border border-gray-700 rounded-lg shadow mx-3 my-2 flex flex-col justify-between"> 
        {children}
       </div>
    )
}

const Body =  (props)=>{
    const {text,name}= props;
    
    
    return(<div className="px-5 pb-5 h-full">
                <a href="">
                    <h5 className="text-xl font-semibold tracking-tight text-white"> {name}...
                    </h5>
                    <p className="text-m text-white ">{text}</p>
            </a>
            </div>)
}

const Footer=(props)=>{
    const {price,handleAddToCart,id} =props;
    return( <div className="flex items-center justify-between px-5 pb-5"> <span className="text-xl font-bold text-white">{price.toLocaleString('id-ID', {style: "currency", currency:'USD'})}</span>
            <Button classname="bg-blue-600" onClick ={()=>handleAddToCart(id)}>add to cart</Button>
             
            </div>)
}

const Header =(props)=>{
    const {image,id}= props;
    return( 
            
            <Link to={`/product/${id}`}>
                <img src={image} alt="product" className="p-8 rounded-t-lg h-60 w-full object-cover" />
            </Link>
           
           
            
    )
}
CardProduct.Header= Header;
CardProduct.Body = Body;
CardProduct.Footer= Footer;
export default CardProduct