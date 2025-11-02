import axios from "axios";

let api = axios.create({
    baseURL : 'https://product-server-7gch.onrender.com'
})

//get 

export const getData = ()=>{
    return api.get('/products')
}

//post 

export const postData = (data)=>{
    return api.post('/products',data)
}

//delete

export const deleteData = (id)=>{
    return api.delete(`/products/${id}`)
}

//edit 

export const patchData = (id,newData)=>{
    return api.patch(`/products/${id}`,newData)
}