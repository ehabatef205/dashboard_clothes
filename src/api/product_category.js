import axios from 'axios'
import { backend_url } from '../config'
const proxy = `${backend_url}/main_category`

export const add_product_category = async ({ name, desc }) => {
    await axios.post(`${proxy}`, { name, desc })
}

export const all_product_category = async () => {
    return (await (await axios.get(`${proxy}`)).data)
}

export const get_product_category_by_id = async (_id) => {
    return (await (await axios.get(`${proxy}/${_id}`)).data)
}

export const delete_product_category = async (_id) => {
    await axios.delete(`${proxy}/${_id}`)
}

export const update_product_category = async (_id, name) => {
    await axios.put(`${proxy}/${_id}`, { name })
}