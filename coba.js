import axios from "axios";

const coba = async()=>{
const response = await axios.get('https://pro.rajaongkir.com/api/province', {
  headers: {
    key: '76f42eea4723e7cda981bd0365df9995'
  }
})

console.log(response.data.rajaongkir.results)
const data = await response.data.rajaongkir.results
console.log(data)

}
coba()