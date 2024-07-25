

import EditProduct from "../components/admin/EditProduct.jsx"
import { useLoginAdmin } from '../hooks/useLoginAdmin.jsx'
const AdminEditPage= ()=>{
    const name = useLoginAdmin()

    return(
        <EditProduct/>
    )
}

export default AdminEditPage