import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../Elements/Button/index.jsx";


const ProductAdmin = () => {
  const [products, setProducts] = useState([]) 
  const[currentPage, setCurrentPage] = useState(1) 
  const [maxPage,setMaxPage] = useState(0)
  // Initialize products as an empty array
  const handlePage = page => {
    setCurrentPage(page)
  }

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
        params: {
          page: currentPage,
          limit: 10
        }
      })
      const maxpages = Math.ceil(response.data.pagination.totalCount / 10)
      setMaxPage(maxpages)
      const fetchedProducts = response.data.hasil // Assuming 'hasil' is the key in the API response
      setProducts(fetchedProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
      // Handle errors gracefully, e.g., display an error message to the user
    }
  }
  
  useEffect(() => {
    

    fetchProducts() // Call the function to fetch products on component mount
  }, [currentPage])
  const deleteProduct = async productId => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`)
      fetchProducts()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=" flex justify-content px-16 flex-1 pt-14 h-screen overflow-y-scroll">
      <div className="container mt-5 ">
        <Link
          to="/admin/addproduct"
          className="py-3 my-3 cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
        >
          Add New
        </Link>

        <div className=" flex py-6 grid grid-cols-1 md:grid-cols-4 gap-4 mt-2 ">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-slate-200 shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={product.url}
                alt="Image"
                className="p-8 rounded-t-lg h-60 w-full object-cover"
              />
              <div className="px-6 py-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {product.name}
                </h2>
              </div>
              <div className="flex justify-between items-center px-6 py-3 border-t border-gray-200">
                <Link
                  to={`/admin/editproduct/${product.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="text-red-500 hover:bg-red-300 border-2 border-red-300 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      <div className="flex flex-wrap justify-center content-between">
        {currentPage > 1 && (
          <Button
            classname="bg-blue-600"
            onClick={() => {
              handlePage(currentPage - 1)
            }}
          >
            -
          </Button>
        )}

        <p className="text-3xl text-blue-500 px-5">{currentPage}</p>

        {currentPage < maxPage && (
          <Button
            classname="bg-blue-600"
            onClick={() => {
              handlePage(currentPage + 1)
            }}
          >
            +
          </Button>
        )}
      </div>
      </div>
    </div>
  )
}

export default ProductAdmin;
