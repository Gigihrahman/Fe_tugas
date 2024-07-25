import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

export const EditMerk = ()=>{
    const [name,setName] = useState("")
    const [image,setImage]= useState("")
    const [url,setUrl] =useState("");
    const [file,setFile] =useState("")
    const[preview,setPreview]= useState("")
    const [failed,setFailed] = useState("")
    const {id} = useParams()
  const navigate = useNavigate()

    useEffect(()=>{
        getMerkById()
    },[])
    const getMerkById =async()=>{
            const response = await axios.get(import.meta.env.VITE_API_URL+"/merk/"+ id )
            setName(response.data.merk.name)
            setFile(response.data.merk.image)
            setPreview(response.data.merk.url)
            console.log(response)       


    }

    const loadImage = e => {
      const image = e.target.files[0]
      setFile(image)
      setPreview(URL.createObjectURL(image))



      
    }

    const updateMerk = async(e)=>{
        e.preventDefault();
        const formData = new FormData()
        formData.append('file', file)
        formData.append('name', name)
        const coba = Object.fromEntries(formData)
        console.log(coba)

        try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/merk/${id}`, formData, {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        })
        navigate('/admin')
      } catch (error) {
        setFailed(error)
        console.log(error)
      }
    }

        
    

    return (
      <div className="flex justify-center mt-5">
        <div className="w-full md:w-1/2 px-4">
          <form onSubmit={updateMerk}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Merk Name
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder= {name}
              />
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


  }