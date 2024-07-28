
import { useState,useEffect } from "react"
import Inputform from "../components/Elements/Input/index.jsx"
import { Toasted } from "../components/Elements/toast/Toast.jsx"
import axios from "axios"
import { Navigate } from "react-router-dom"
import Button from "../components/Elements/Button/index.jsx"
import { useLoginAdmin } from '../hooks/useLoginAdmin.jsx'

export const AdminLogin = async() => {
  const [status, setStatus] = useState('')

  const handleLogin = async(event) => {
    event.preventDefault()

    const data = {
      username: event.target.username.value,
      password: event.target.password.value
    }
   
        const response = await axios.post(import.meta.env.VITE_API_URL+"/admin",data)
        console.log(response)
        localStorage.setItem('tokenAdmin', response.data.token)
        Navigate('/admin')
   
  }

  return (
    <form onSu >
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
      {status && <Toasted message={status} />}
    </form>
  )
}