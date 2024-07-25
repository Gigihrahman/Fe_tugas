import MerkAdmin from "../components/admin/Merk/Merk.jsx"
import Sidebar from "../components/Elements/sidebar.jsx/index.jsx"
import { useLoginAdmin } from '../hooks/useLoginAdmin.jsx'

export const AdminMerkPage = ()=>{
    const name = useLoginAdmin()



    return (
      <div className="flex flex-wrap">
        <Sidebar />
        <MerkAdmin />
      </div>
    )




}


