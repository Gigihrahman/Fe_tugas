import { AddMerk } from "../components/admin/Merk/addMerk.jsx"
import { useLoginAdmin } from "../hooks/useLoginAdmin.jsx"

export const AdminAddMerkPage = ()=>{
        const name = useLoginAdmin()


    return(
        <>
       
            <AddMerk/>
            </>
    )
}