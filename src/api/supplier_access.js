import axios from 'axios'
import {backend_url} from '../config'
import {Cookies} from 'react-cookie'
const proxy = `${backend_url}/supp`
const cookie = new Cookies()

export const add_product = async ({Product_name, Product_desc, Product_SKU, Product_category_id, quantity, Product_price, Product_discount_id}) => {
    const token = await cookie.get('AuthAdmin')
    await axios.post(`${proxy}`,{Product_name, Product_desc, Product_SKU, Product_category_id, quantity, Product_price, Product_discount_id}, { headers: { authorization: token } })
}

export const my_products = async () => {
    const token = await cookie.get('AuthAdmin')
    return (await (await axios.get(`${proxy}/my`, { headers: { authorization: token } })).data)
}


export const hide_product = async (_id) => {
    const token = await cookie.get('AuthAdmin')
    return (await (await axios.put(`${proxy}/hide/${_id}`, { headers: { authorization: token } })).data)
}
export const show_product = async (_id) => {
    const token = await cookie.get('AuthAdmin')
    return (await (await axios.put(`${proxy}/show/${_id}`, { headers: { authorization: token } })).data)
}

export const update_product = async (_id, {Product_name, Product_desc, Product_SKU, Product_category_id, quantity, Product_price, Product_discount_id}) => {
    await axios.put(`${proxy}/update/${_id}`, {Product_name, Product_desc, Product_SKU, Product_category_id, quantity, Product_price, Product_discount_id})
}


export const add_supplier = async (name,email,password) => {
    const token = await cookie.get('AuthAdmin')
    return (await (await axios.post(`${proxy}/sign_up`,{
        name:name ,
        email: email ,
        password: password ,
    }, { headers: { authorization: token } })).data)
}
export const allsupliers = async (_id) => {
    const token = await cookie.get('AuthAdmin')
    return await(await axios.get(`${proxy}/all`, { headers: { authorization: token } }))
}

export const enable = async (_id,name) => {
    const token = await cookie.get('AuthAdmin')
    return (await (await axios.put(`${proxy}/enable/${_id}`,{name:name}, { headers: { authorization: token } })).data)
}
export const disable = async (_id,name) => {
    const token = await cookie.get('AuthAdmin')
    return (await (await axios.put(`${proxy}/disable/${_id}`,{name:name}, { headers: { authorization: token } })).data)
}