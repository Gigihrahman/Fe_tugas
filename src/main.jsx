import React from 'react'
import ReactDOM from 'react-dom/client'


import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import LoginPage from './Pages/login.jsx'
import RegisterPage from './Pages/register.jsx'
import ErrorPage from './Pages/404.jsx'
import ProductsPage from './Pages/products.jsx';
import AdminPage from './Pages/admin.jsx'
import ProfilePage from './Pages/profile.jsx'
import DetailProductPage from './Pages/detailProduct.jsx'
import AdminEditPage from './Pages/adminedit.jsx'
import PageAdminAddProduct from './Pages/adminadd.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <div>halllo</div>,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/products',
    element: <ProductsPage />
  },
  {
    path: '/admin',
    element: <AdminPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/product/:id',
    element: <DetailProductPage />
  },
  {
    path: '/editproduct/:id',
    element: <AdminEditPage />
  },
  {
    path: '/addproduct',
    element: <PageAdminAddProduct />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
