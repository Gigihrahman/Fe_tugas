import React from 'react'

const Product = ({ product, onAddToCart }) => {
  const { id, name, price, image } = product

  return (
    <div className="flex flex-col border rounded-lg p-4 shadow-md hover:shadow-lg-hover">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="flex flex-col justify-between p-2">
        <h3 className="text-lg font-medium text-gray-800">{name}</h3>
        <p className="text-gray-600 text-sm">Price: ${price.toFixed(2)}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={() => onAddToCart(product)} // Pass the entire product object
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default Product
