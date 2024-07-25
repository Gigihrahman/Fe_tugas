
import { jwtDecode } from "jwt-decode"
import { useState, useEffect } from "react"

export const useLoginAdmin = () => {
  const [name, setName] = useState("")
  useEffect(() => {
    const token = localStorage.getItem('tokenAdmin')
    if (token) {
      setName(getName(token))
    } else {
      window.location.href = '/adminlogin'
    }
  }, [])
  return name
}


export const getName = token => {
  const decoded = jwtDecode(token)
  console.log(decoded)
  return decoded
}