// import axios from "axios";

// const coba = async()=>{
// const response = await axios.get('https://pro.rajaongkir.com/api/province', {
//   headers: {
//     key: '76f42eea4723e7cda981bd0365df9995'
//   }
// })

// console.log(response.data.rajaongkir.results)
// const data = await response.data.rajaongkir.results
// console.log(data)

// }
// coba()
// import axios from "axios"

// try {
//  const coba = await axios.post('http://localhost:5000/register')
//   console.log(coba.response.status)
// } catch (error) {
//   console.log(error.response.status)
//   console.log(error.response.data.message)
// }

import { jwtDecode } from "jwt-decode";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTcyMDg4Njc0NX0.Vki7W8SRS_vIGNAEDF1TOCJ6kJkMhTY1CV3wHJ8WoyU`;

  const decoded = jwtDecode(token)
  console.log(decoded.id)

