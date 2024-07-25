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
import {CartPage} from './Pages/cart.jsx'
import { Coba } from './Pages/coba';
import { HomePage } from './Pages/home';
import { History } from './components/Elements/history/History.jsx'
import { DetailPaymentUser } from './Pages/detailPaymentUser.jsx'
import { BrandPage } from './Pages/brand.jsx'
import { AdminHistoryPage } from './Pages/adminhistory.jsx'
import { AdminDetailHistory } from './Pages/admindetailhistory.jsx'
import { AdminMerkPage } from './Pages/adminmerk.jsx'
import { AdminEditMerk } from './Pages/admineditmerk.jsx'
import { AdminAddMerkPage } from './Pages/adminaddmerk.jsx'
import { AdminLogin } from './Pages/adminlogin.jsx'
import { LoginAdminPage } from './Pages/loginAdmin.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
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
    path: '/editprofile',
    element: <ProfilePage />
  },
  {
    path: '/product/:id',
    element: <DetailProductPage />
  },

  {
    path: '/productscart',
    element: <CartPage />
  },
  {
    path: '/coba',
    element: <Coba />
  },
  {
    path: '/history',
    element: <History />
  },
  {
    path: '/history/:id',
    element: <DetailPaymentUser />
  },
  //admin
  {
    path: '/admin',
    element: <AdminPage />
  },
  {
    path: '/admin/editproduct/:id',
    element: <AdminEditPage />
  },
  {
    path: '/admin/addproduct',
    element: <PageAdminAddProduct />
  },
  {
    path: '/admin/brand',
    element: <BrandPage />
  },
  {
    path: '/admin/history',
    element: <AdminHistoryPage />
  },
  {
    path: '/admin/history/:id',
    element: <AdminDetailHistory />
  },
  {
    path: '/admin/merk',
    element: <AdminMerkPage />
  },
  {
    path: '/admin/merk/:id',
    element: <AdminEditMerk />
  },
  {
    path: '/admin/addmerk/',
    element: <AdminAddMerkPage />
  },
  {
    path: '/adminlogin',
    element: <LoginAdminPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
