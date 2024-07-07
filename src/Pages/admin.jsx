import Sidebar from "../components/Elements/sidebar.jsx/index.jsx";
import Button from './../components/Elements/Button/index';
import { useState } from "react";
import ProductAdmin from "../components/admin/ProductList.jsx";

import Modal from "../components/Elements/modal/index.jsx";


const AdminPage = ()=>{
    const [open, setOpen] = useState(false)
    return(
        <div className="flex flex-wrap" > 
            
              <Sidebar/>
              <ProductAdmin/>
            
             {/* <div className="haloo bg-blue-500 px-16 flex-1 pt-14 h-screen overflow-y-scroll ">
                <div className="border rounded-lg shadow-lg text-3xl py-2 mb-10">Transaksi</div>

                <div className="border rounded-lg shadow-lg text-2xl p-2 my-5">
                    <Button classname="btn btn-danger bg-red-600" onClick={() => setOpen(true)}>
                        bagus
                    </Button>
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <div className="text-center w-56">
                            <div className="mx-auto my-4 w-48">
                             <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
                             <p className="text-sm text-gray-500">
                                 Are you sure you want to delete this item?
                             </p>
                         </div>
                         <div className="flex gap-4">
                            <button className="btn btn-danger w-full">Delete</button>
                             <button
                                 className="btn btn-light w-full"
                                onClick={() => setOpen(false)}
                             >
                            Cancel
                            </button>
                             </div>
                        </div>
                    </Modal>



                </div>
                <div className="border rounded-lg shadow-lg text-2xl p-2 my-5">Transaksi</div>
                
                
                </div> */}
             
        </div>
    )
}
export default AdminPage;