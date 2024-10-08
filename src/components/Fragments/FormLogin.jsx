import Button from "../Elements/Button/index.jsx";
import Inputform from "../Elements/Input/index.jsx";
import { login } from "../../services/auth.service.js";
import { useState } from "react";
import { Toasted} from "../Elements/toast/Toast.jsx";
const FormLogin =() =>{
  const[loginFailed,setLoginFailed]=useState("")
  
  const handleLogin = (event)=>{
    event.preventDefault();
    
   
        const data = {
        email: event.target.email.value,
        password: event.target.password.value,
        

    }
    login(data,(status,res)=>{
      if(status){
        localStorage.setItem('token',res.token)
        window.location.href= "/";

      }
      else{
        setLoginFailed(res.response.data)
      }
    })
  }

return(<form onSubmit={handleLogin}>
            
            <Inputform label ="Email"
             type="email"
              placeholder="example@mail.com" 
              name="email"/>
            <Inputform label ="Password"
              type="password"
               placeholder="******"
                name="password"/>
            
            
            <Button classname="bg-blue-600 w-full" type="submit" >Login</Button>
            {loginFailed && <Toasted message={loginFailed} />}
          </form>);
}

export default FormLogin;