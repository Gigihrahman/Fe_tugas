import React, { useState } from 'react'

const Cart = ({ cartItems, onRemoveFromCart, onUpdateQuantity }) => {
  const [totalPrice, setTotalPrice] = useState(0)

  // Calculate total price on cart update
  React.useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
    setTotalPrice(total)
  }, [cartItems])

  return (
    <div className="fixed bottom-0 right-0 p-4 bg-white z-50 rounded-lg shadow-md">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="list-none">
          {cartItems.map(item => (
            <li
              key={item.id}
              className="flex items-center py-2 border-b border-gray-200"
            >
              <span className="text-gray-700 mr-4">{item.name}</span>
              <span className="text-gray-500 text-sm">
                <button
                  className="text-gray-500 hover:text-blue-500 focus:outline-none"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="text-gray-500 hover:text-blue-500 focus:outline-none"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </span>
              <button
                className="ml-auto text-red-500 hover:text-red-700 focus:outline-none"
                onClick={() => onRemoveFromCart(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div className="flex justify-between mt-4">
          <p className="text-gray-700 font-medium">Total:</p>
          <p className="text-gray-800 font-bold">${totalPrice.toFixed(2)}</p>
        </div>
      )}
    </div>
  )
}

export default Cart
