import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const ProductAdmin = () => {
  const [products, setProducts] = useState([]) // Initialize products as an empty array

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products')
        const fetchedProducts = response.data.hasil // Assuming 'hasil' is the key in the API response
        setProducts(fetchedProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
        // Handle errors gracefully, e.g., display an error message to the user
      }
    }

    fetchProducts() // Call the function to fetch products on component mount
  }, [])
  const deleteProduct = async productId => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`)
      getProducts()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=" flex justify-content px-16 flex-1 pt-14 h-screen overflow-y-scroll">
      <div className="container mt-5 ">
        <Link
          to="/add"
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
                  to={`edit/${product.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => deleteProduct(product.id)}
                  className="text-red-500 hover:bg-red-300 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductAdmin;
