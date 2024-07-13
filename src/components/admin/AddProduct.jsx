import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const [desc,setDesc]= useState("")
  const [berat,setBerat]= useState(0)
  const[merk,setMerk]= useState([])
  const [selectedMerk, setSelectedMerk]= useState(0)

  const getMerk = async()=>{
    const response = await axios.get(import.meta.env.VITE_API_URL+'/merk')
    const out = response.data.merk
    setMerk(out)

  console.log(out)

  }
  useEffect(()=>{
    getMerk()
    
  },[])
  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append('desc',desc)
    formData.append('berat',berat)

    formData.append("title", title);

    try {
      await axios.post("http://localhost:5000/products", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen  mt-5">
      <div className="w-full md:w-1/2 px-4">
        <form onSubmit={saveProduct}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Product Name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="desc"
              className="block text-sm font-medium text-gray-700"
            >
              Deskripsi
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Deskripsi"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="berat"
              className="block text-sm font-medium text-gray-700"
            >
              Berat
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={berat}
              onChange={e => setBerat(e.target.value)}
              placeholder="Deskripsi"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-500">
              Merk
            </label>
            <select
              name="merk"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={selectedMerk}
              onChange={e=>setSelectedMerk(e.target.value)}
              
            >

              <option value=""> Select Merk</option>
              {merk.map(merk =>(
                <option
                  key={merk.id}
                  value={merk.id}
                >
                  {merk.name}
                </option>)
              )}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <div className="relative">
              <input
                type="file"
                id="image"
                className="w-full cursor-pointer rounded-md bg-gray-100 border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={loadImage}
              />
              <button
                type="button"
                className="absolute right-3 top-3 rounded-md bg-blue-500 py-1 px-2 text-xs text-white hover:bg-blue-700"
              >
                Choose a file...
              </button>
            </div>
          </div>

          {preview && (
            <div className="mb-4">
              <img
                src={preview}
                alt="Preview Image"
                className="w-32 h-32 rounded-md object-cover"
              />
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default AddProduct;
