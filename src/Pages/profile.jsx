import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Inputform from './../components/Elements/Input/index';


const ProfilePage= () => {
  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [subDistricts, setSubDistricts] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedSubDistrict, setSelectedSubDistrict] = useState('')

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('http://localhost:5000/provinces')
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
          `http://localhost:5000/cities?province=${selectedProvince}`
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
          `http://localhost:5000/subdistricts?city=${selectedCity}`
        )
        setSubDistricts(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchSubDistricts()
  }, [selectedCity])

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Selected Province:', selectedProvince)
    console.log('Selected City:', selectedCity)
    console.log('Selected Sub-District:', selectedSubDistrict)
  }

  return (
    <>
      <div className="bg-gray-200">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <p className="py-5 text-slate-600 text-3xl text-center font-semibold">
              {' '}
              Edit Profile
            </p>
            <form onSubmit={handleSubmit} className="p-4">
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
              <Inputform
                label="Address"
                type="text"
                placeholder="Insert your address"
                name="address"
              />

              <button
                type="submit"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage