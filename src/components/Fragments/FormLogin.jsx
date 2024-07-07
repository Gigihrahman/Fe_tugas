import Button from "../Elements/Button/index.jsx";
import Inputform from "../Elements/Input/index.jsx";
import { login } from "../../services/auth.service.js";
import { useState } from "react";
const FormLogin =() =>{
  const[loginFailed,setLoginFailed]=useState("")
  
  const handleLogin = (event)=>{
    event.preventDefault();
    
   
        const data = {
        username: event.target.username.value,
        password: event.target.password.value,
        

    }
    login(data,(status,res)=>{
      if(status){
        localStorage.setItem('token',res.token)
        window.location.href= "/products";

      }
      else{
        setLoginFailed(res.response.data)
      }
    })
  }

return(<form onSubmit={handleLogin}>
            
            <Inputform label ="Username"
             type="text"
              placeholder="example" 
              name="username"/>
            <Inputform label ="Password"
              type="password"
               placeholder="******"
                name="password"/>
            
            
            <Button classname="bg-blue-600 w-full" type="submit" >Login</Button>
            {loginFailed && <p className="text-red-500 text-center mt-5">{loginFailed}</p>}
          </form>);
}

export default FormLogin;