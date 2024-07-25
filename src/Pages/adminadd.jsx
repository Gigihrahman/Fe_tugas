
import AddProduct from "../components/admin/AddProduct.jsx";
import { useLoginAdmin } from "../hooks/useLoginAdmin.jsx";


const PageAdminAddProduct = ()=>{
     const name = useLoginAdmin()

    return(
        <AddProduct/>
    )
}

export default PageAdminAddProduct;