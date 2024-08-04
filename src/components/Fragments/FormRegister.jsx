import Button from "../Elements/Button/index.jsx";
import Inputform from "../Elements/Input/index.jsx";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { Toasted } from "../Elements/toast/Toast.jsx";
const FormRegister = () =>{
  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [subDistricts, setSubDistricts] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('0')
  const [selectedCity, setSelectedCity] = useState('0')
  const [selectedSubDistrict, setSelectedSubDistrict] = useState('0')
  const [status, setStatus]=useState("")
   const [phoneNumber, setPhoneNumber] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL+'/provinces')
        setProvinces(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProvinces()
  }, [])

  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedProvince) return

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/cities?province=${selectedProvince}`
        )
        setCities(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCities()
  }, [selectedProvince])

  useEffect(() => {
    const fetchSubDistricts = async () => {
      if (!selectedCity) return

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/subdistricts?city=${selectedCity}`
        )
        setSubDistricts(response.data)
      } catch (error) {
        console.error(error)
        
      }
    }

    fetchSubDistricts()
  }, [selectedCity])
const handleChange = event => {
  const { value } = event.target
  // Allow only digits and limit to 13 characters
  if (/^\d{0,13}$/.test(value)) {
    setPhoneNumber(value)
  }
}


const handleRegister = async(event)=>{
   event.preventDefault();
  console.log("running function")
console.log(event)
  const data = {
    username: event.target.fullname.value,
    email: event.target.email.value,
    numberPhone: event.target.numberPhone.value,

    password: event.target.password.value,
    confirmPassword: event.target.confirmpassword.value,
    province: selectedProvince,
    city: selectedCity,
    subdistrict: selectedSubDistrict,
    full_address: event.target.fulladdress.value
  }

  try {
  const response= await axios.post(import.meta.env.VITE_API_URL + '/register', data);
  console.log(response)
  localStorage.setItem('token', response.data.token)
  navigate('/')
} catch (error) {
  console.log(error)
  setStatus(error.response.data.message)
}

}


return (
  <form onSubmit={handleRegister}>
    <Inputform
      label="Fullname"
      type="text"
      placeholder="Insert your name"
      name="fullname"
    />
    <Inputform
      label="Email"
      type="email"
      placeholder="example@mail.com"
      name="email"
    />
    <div className="mb-6">
      <label
        htmlFor="numberPhone"
        className="
              block text-slate-700 text-sm font-bold mb-2"
      >
        Phone Number:
      </label>
      <input
        className="text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-50"
        type="text"
        name="numberPhone"
        id="numberPhone"
        value={phoneNumber}
        onChange={handleChange}
        placeholder="Enter phone number"
      />
      <p>Phone number length: {phoneNumber.length} / 13</p>
    </div>
    <Inputform
      label="Password"
      type="password"
      placeholder="******"
      name="password"
    />
    <Inputform
      label="Confirm Password"
      type="password"
      placeholder="******"
      name="confirmpassword"
    />
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        Province
      </label>
      <select
        name="province"
        className="province mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={selectedProvince}
        onChange={e => setSelectedProvince(e.target.value)}
      >
        <option value="">Select Province</option>
        {provinces.map(province => (
          <option key={province.province_id} value={province.province_id}>
            {province.province}
          </option>
        ))}
      </select>
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">City</label>
      <select
        name="city"
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={selectedCity}
        onChange={e => setSelectedCity(e.target.value)}
        disabled={!selectedProvince}
      >
        <option value="">Select City</option>
        {cities.map(city => (
          <option key={city.city_id} value={city.city_id}>
            {city.city_name}
          </option>
        ))}
      </select>
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        Sub-District
      </label>
      <select
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={selectedSubDistrict}
        onChange={e => setSelectedSubDistrict(e.target.value)}
        disabled={!selectedCity}
      >
        <option value="">Select Sub-District</option>
        {subDistricts.map(subDistrict => (
          <option
            name="subdistrict"
            key={subDistrict.subdistrict_id}
            value={subDistrict.subdistrict_id}
          >
            {subDistrict.subdistrict_name}
          </option>
        ))}
      </select>
    </div>
    <Inputform
      label="Full Address"
      type="text"
      placeholder="Insert your full address"
      name="fulladdress"
    />

    <Button classname="bg-blue-600 w-full" type="submit">
      Register
    </Button>
    {status && <Toasted message={status} />}
  </form>
)

}

export default FormRegister;