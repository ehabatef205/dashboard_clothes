import axios from 'axios'
import {backend_url} from '../config'
const proxy = `${backend_url}/product`

export const add_product = async ({Product_name, Product_desc, Product_SKU, Product_category_id, quantity, Product_price, Product_discount_id}) => {
    await axios.post(`${proxy}`,{Product_name, Product_desc, Product_SKU, Product_category_id, quantity, Product_price, Product_discount_id})
}

export const all_product = async () => {
    return (await (await axios.get(`${proxy}`)).data)
}

export const get_product_by_id = async (_id) => {
    return (await (await axios.get(`${proxy}/${_id}`)).data)
}

export const delete_product = async (_id) => {
    await axios.delete(`${proxy}/${_id}`)
}

export const update_product = async (_id, {Product_name, Product_desc, Product_SKU, Product_category_id, quantity, Product_price, Product_discount_id}) => {
    await axios.put(`${proxy}/${_id}`, {Product_name, Product_desc, Product_SKU, Product_category_id, quantity, Product_price, Product_discount_id})
}

export const get_product_by_category =  async (_id) => {
    return (await (await axios.get(`${proxy}/category/${_id}`)).data)
}

export const get_product_by_type =  async (_id,type) => {
    return (await (await axios.post(`${proxy}/type/${_id}`,{typeOfProduct:type})).data)
}


