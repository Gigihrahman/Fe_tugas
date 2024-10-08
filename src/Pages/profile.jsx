import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { UserOption } from '../components/Elements/user/option.jsx';
import { useLogin } from '../hooks/uselogin.jsx';
import Inputform from './../components/Elements/Input/index';
import { Toasted } from '../components/Elements/toast/Toast.jsx';
import { EditToasted } from '../components/Elements/toast/editToast.jsx';


const ProfilePage= () => {
  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [subDistricts, setSubDistricts] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedSubDistrict, setSelectedSubDistrict] = useState('')
  const username = useLogin()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [status,setStatus]=useState("")
  const [address, setAddress] = useState('')
  const [fullname,setFullname]= useState('')
  

  const getUser = async() =>{
    const token = localStorage.getItem('token')
    const response = await axios.get(import.meta.env.VITE_API_URL + '/userid', {
      headers: {
        token: token
      }
    })
    const data =response.data.user
    console.log(response)
    setSelectedProvince(data.province_code)
    setSelectedCity(data.city_code)
    setSelectedSubDistrict(data.subdistricts_code)
    setPhoneNumber(data.number_phone)
    setAddress(data.full_address)
    setFullname(data.username)
  }
  useEffect(()=>{
    getUser()
  },[])

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/provinces`
        )
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

  const handleSubmit = async(event) => {
    event.preventDefault()
    const token =localStorage.getItem('token')
    const data = {
      username: event.target.fullName.value,

      numberPhone: event.target.numberPhone.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmpassword.value,
      province: selectedProvince,
      city: selectedCity,
      subdistrict: selectedSubDistrict,
      full_address: event.target.address.value
    }
    console.log(data)

    try {
  const response= await axios.patch(import.meta.env.VITE_API_URL + '/user', data,{
    headers:{
      token:token
    }
  });
  console.log(response)
  
  window.location.href="/"
} catch (error) {
  console.log(error)
  setStatus(error.response.data.message)
}

  }
  const handleFullNameChange =(event)=>{
    const {value} = event.target;
    setFullname(value)
  }
   const handleAddress = event => {
     const { value } = event.target
     setAddress(value)
   }

  return (
    <>
      <div className="flex justify-end h-20 bg-primary text-white items-center px-10 sticky top-0 z-50">
        <UserOption username={username.username || ' '}></UserOption>
        <a
          className=" w-20 y-10 ml-5 rounded-lg bg-white  fixed top-5 left-5 flex justify-center"
          href="/"
        >
          <p className="text-red-600">Home</p>
        </a>
      </div>
      <div className="bg-secondary py-20">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <p className="py-5 text-slate-600 text-3xl text-center font-semibold">
              {' '}
              Edit Profile
            </p>
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-6">
                <label
                  htmlFor="fullName"
                  className="block text-slate-700 text-sm font-bold mb-2"
                >
                  Full Name:
                </label>
                <input
                  className="text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-50"
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={fullname}
                  onChange={handleFullNameChange}
                  placeholder="Enter full name"
                />
              </div>

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
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={selectedProvince}
                  onChange={e => setSelectedProvince(e.target.value)}
                >
                  <option value="">Select Province</option>
                  {provinces.map(province => (
                    <option
                      key={province.province_id}
                      value={province.province_id}
                    >
                      {province.province}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <select
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
                      key={subDistrict.subdistrict_id}
                      value={subDistrict.subdistrict_id}
                    >
                      {subDistrict.subdistrict_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="address"
                  className="block text-slate-700 text-sm font-bold mb-2"
                >
                  address:
                </label>
                <input
                  className="text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-50"
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  onChange={handleAddress}
                  placeholder="Enter full address"
                />
              </div>

              <button
                type="submit"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
            {status && <EditToasted message={status} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage