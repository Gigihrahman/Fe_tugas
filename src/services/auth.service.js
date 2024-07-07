import axios from "axios";
import { jwtDecode } from "jwt-decode";



export const login= (data,callback)=>{
    axios
      .post('http://localhost:5000/login', data)
      .then(res => {
        console.log(res)
        callback(true, res.data)
      })
      .catch(error => {
        callback(false, error)
      })
}

export const getUsername=(token)=>{
    const decoded = jwtDecode(token);
        console.log(decoded);
        return decoded
}