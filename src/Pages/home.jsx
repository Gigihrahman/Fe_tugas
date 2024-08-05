import { useState,useEffect, Fragment } from "react";
import CarouselContent from "../components/carousel/carousel.jsx";
import { useLogin } from '../hooks/uselogin.jsx'
import Button from "../components/Elements/Button/index.jsx";
import { FaRegUser } from 'react-icons/fa'
import { CategoryCard } from './../components/category/categoryCard';
import { UserOption } from './../components/Elements/user/option';
import { Footer } from "../components/Elements/footer/footer.jsx";
import { getUsername } from "../services/auth.service.js";
import axios from "axios";


export const HomePage= ()=>{
    const [banner, setBanner] = useState([
      '/images/artboardbanner1.png',
      '/images/artboardbanner2.png',
      '/images/artboardbanner3.png'
    ])
     const [username, setUsername] = useState('')
     const [brand,setBrand]= useState([])
 const getBrandData = async () => {
  const url = import.meta.env.VITE_API_URL
   const response = await axios.get(`${url}/merk`)
   console.log(`${url}/merk`)
   console.log(response.data)
   console.log('ini datane:  ' + response)
  
   setBrand(response.data.merk)
 }
     const checkLogin = ()=>{
      const token = localStorage.getItem('token')
      console.log(token)
        if(token){
          setUsername(getUsername(token))
        }
     }
     useEffect(()=>{
      checkLogin()
      getBrandData()
     },[])
      const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    
      const handleHome =()=>{
        window.location.href = '/'
      }

    return (
      <>
        <div className="bg-secondary">
          <div className="flex justify-end h-20 bg-primary text-white items-center px-10 sticky top-0 z-50">
            {username ? (
              <UserOption username={username.username || ' '} />
            ) : (
              <a
                href="/login"
                className="bg-secondary w-20 y-5 rounded-lg shadow text-center text-xl text-black flex flex-wrap"
              >
                {' '}
                <FaRegUser className="px-1" /> Login{' '}
              </a>
            )}

            <a
              className=" w-20 y-10 ml-5 rounded-lg bg-white  fixed top-5 left-5 flex justify-center"
              href="/"
            >
              <p className="text-red-600">Home</p>
            </a>
          </div>
          <div>
            <CarouselContent autoSlide={true} autoSlideInterval={2000}>
              {banner.map(data => (
                <img key={data} src={data} />
              ))}
            </CarouselContent>
          </div>
          <h1 className="text-3xl text-primary flex justify-center">
            Brand Parfume
          </h1>
          <div className="py-12 flex flex-wrap justify-between px-12">
            
            {brand.map(data => (
              <CategoryCard srcCategory={data.url} nameCategory={data.name}>
                {data.name}
              </CategoryCard>
            ))}
          </div>
          <div>
            <img src="/public/images/operational.png" alt="" />
          </div>
        </div>
        <div className="bg-secondary">
          <div class="w-full  items-center lg:px-24 max-w-7xl md:px-12 mx-auto px-8 py-12 h-96">
            <div class="relative items-center">
              <div class="w-full justify-between lg:inline-flex lg:items-center">
                <div class="max-w-xl">
                  <span class="text-sm font-extrabold text-primary  uppercase tracking-widest">
                    Belanja
                  </span>
                  <p class="text-black font-extrabold mt-8 text-4xl tracking-tight">
                    Carilah Produk Kami
                    <span class="lg:block">Parfum yang sesuai untuk anda.</span>
                  </p>
                </div>
                <div class="flex flex-col lg:ml-auto mt-12 sm:flex-row">
                  <a
                    class="w-full items-center inline-flex duration-200 focus:outline-none font-medium justify-center px-6 py-3 rounded-xl text-center focus-visible:outline-black lg:w-auto bg-primary focus-visible:ring-black hover:bg-rose-100 hover:text-rose-500 text-white"
                    href="/products"
                  >
                    Belanja Sekarang &nbsp;&nbsp;
                    <span class="font-bold text-2xl">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </>
    )




}
