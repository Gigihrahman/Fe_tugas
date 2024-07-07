import axios from "axios";

export const getProducts = (callback)=>{
    axios
      .get('http://localhost:5000/products')
      .then(res => {
        callback(res.data.hasil)
        console.log(res.data.hasil)
      })
      .catch(err => {
        console.log(err)
      })
}

export const getDetailProduct = (id,callback) => {
  axios
    .get(`http://localhost:5000/products/${id}`)
    .then(res => {
      callback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

