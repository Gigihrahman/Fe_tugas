import React, { useState } from 'react'
import Product from '../components/cart/product.jsx' // Import the Product component
import Cart from '../components/cart/cart.jsx' // Import the Cart component

const CartPage = () => {
  const [products, setProducts] = useState([
    // Define your product data here
    {
      id: 1,
      name: 'Product 1',
      price: 19.99,
      image: 'http://localhost:5000/images/4a883374ce93995d90803227f8fc6eb6.jpg'
    },
    {
      id: 2,
      name: 'Product 2',
      price: 29.99,
      image: 'http://localhost:5000/images/4a883374ce93995d90803227f8fc6eb6.jpg'
    }
    // ... Add more products
  ])

  const [cartItems, setCartItems] = useState([])

  const addToCart = product => {
    const existingItem = cartItems.find(item => item.id === product.id)
    if (existingItem) {
      // Update quantity of existing item
      setCartItems(prevCart =>
        prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      // Add new item with quantity 1
      setCartItems(prevCart => [...prevCart, { ...product, quantity: 1 }])
    }
  }

  const onRemoveFromCart = productId => {
    setCartItems(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const onUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      setCartItems(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-medium text-gray-800">Simple Cart</h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <Product
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>
      <aside className="fixed bottom-0 right-0 p-4 bg-white z-50 rounded-lg shadow-md">
        {cartItems.length > 0 && (
          <Cart
            cartItems={cartItems}
            onRemoveFromCart={onRemoveFromCart}
            onUpdateQuantity={onUpdateQuantity}
          />
        )}
      </aside>
    </div>
  )
}

export default CartPage
