
import { EditMerk } from "../components/admin/Merk/editMerk.jsx";
import { useLoginAdmin } from '../hooks/useLoginAdmin.jsx'


export const AdminEditMerk =()=>{
    const name = useLoginAdmin()

    return (
        <EditMerk/>
    )
}