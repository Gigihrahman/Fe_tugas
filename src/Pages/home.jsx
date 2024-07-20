import { useState,useEffect, Fragment } from "react";
import CarouselContent from "../components/carousel/carousel.jsx";
import { useLogin } from '../hooks/uselogin.jsx'
import Button from "../components/Elements/Button/index.jsx";
import { FaRegUser } from 'react-icons/fa'
import { CategoryCard } from './../components/category/categoryCard';


export const HomePage= ()=>{
    const [banner, setBanner] = useState([
      '/public/images/artboardbanner1.png',
      '/public/images/artboardbanner2.png',
      '/public/images/artboardbanner3.png'
    ])
     const username = useLogin()
      const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    

    return (
      <Fragment>
        <div className="bg-slate-300">
          <div className="flex justify-end h-20 bg-blue-500 text-white items-center px-10">
            <FaRegUser />
            {username.username}
            <Button classname="ml-5 bg-black" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          <div>
            <CarouselContent autoSlide={true} autoSlideInterval={2000}>
              {banner.map(data => (
                <img key={data} src={data} />
              ))}
            </CarouselContent>
          </div>
          <h1 className="text-3xl text-blue-600 flex justify-center">Category</h1>
          <div className="py-12 flex flex-wrap justify-between px-12">
            <CategoryCard
              srcCategory="/public/images/rumah1.jpg"
              nameCategory="keren"
            >
              halooooo
            </CategoryCard>
            <CategoryCard
              srcCategory="/public/images/rumah1.jpg"
              nameCategory="keren"
            >
              halooooo
            </CategoryCard>
            <CategoryCard
              srcCategory="/public/images/rumah1.jpg"
              nameCategory="keren"
            >
              halooooo
            </CategoryCard>
          </div>
          <div>
            <img src="/public/images/operational.png" alt="" />
          </div>
        </div>
      </Fragment>
    )




}
