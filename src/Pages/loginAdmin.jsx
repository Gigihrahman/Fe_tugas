
import Button from '../components/Elements/Button/index.jsx';
import Inputform from './../components/Elements/Input/index';
import { Toasted } from './../components/Elements/toast/Toast';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import axios from 'axios';


export const LoginAdminPage = ()=>{
    const [loginFailed,setLoginFailed] = useState("");

    // const getUsername = token => {
    //   const decoded = jwtDecode(token)
    //   console.log(decoded)
    //   return decoded
    // }


    const login= async(data)=>{
       await axios.post(import.meta.env.VITE_API_URL,data)
       
        
    }
    const handleLogin= async(event)=>{
         event.preventDefault();
          const data = {
        name: event.target.username.value,
        password: event.target.password.value,
    }
          try {
            const response = await axios.post(
              import.meta.env.VITE_API_URL + '/admin',
              data
            )
            console.log(response)

            const tokenAdmin = response.data.tokenAdmin
            console.log(tokenAdmin)
            localStorage.setItem('tokenAdmin', tokenAdmin)
            window.location.href = '/admin'
            
          } catch (error) {
            console.log(error)
             setLoginFailed(error.response.data)
          }
                  
       
         
       





    }
    return (
      <div className="flex justify-center min-h-screen items-center bg-gray-200 ">
        <div className="w-full max-w-xs rounded-lg shadow-md p-6 bg-white">
          <h1 className="text-3xl font-bold mb-2 text-blue-600">
            Selamat Datang Admin
          </h1>
          <p className="font-medium text-slate-500">
            Welcome, please enter your data
          </p>
          <form onSubmit={handleLogin}>
            <Inputform
              label="Username"
              type="text"
              placeholder="example"
              name="username"
            />
            <Inputform
              label="Password"
              type="password"
              placeholder="******"
              name="password"
            />

            <Button classname="bg-blue-600 w-full" type="submit">
              Login
            </Button>
            {loginFailed && <Toasted message={loginFailed} />}
          </form>
        </div>
      </div>
    )
}