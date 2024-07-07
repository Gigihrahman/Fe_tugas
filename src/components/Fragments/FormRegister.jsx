import Button from "../Elements/Button/index.jsx";
import Inputform from "../Elements/Input/index.jsx";

const FormRegister = () =>{
return(<form action="">
            <Inputform label ="Fullname"
             type="text"
              placeholder="Insert your name" 
              name="fullname"/>
              <Inputform label ="Email"
             type="email"
              placeholder="example@mail.com" 
              name="email"/>
            <Inputform label ="Password"
              type="password"
               placeholder="******"
                name="password"/>
                <Inputform label ="Confirm Password"
              type="password"
               placeholder="******"
                name="confirmpassword"/>
            
            
            <Button classname="bg-blue-600 w-full">Register</Button>
          </form>)

}

export default FormRegister;