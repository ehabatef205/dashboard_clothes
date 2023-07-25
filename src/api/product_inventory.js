import axios from 'axios'
import {backend_url} from '../config'
const proxy = `${backend_url}/product_inventory`

export const add_product_inventory = async (quantity) => {
    await axios.post(`${proxy}`,{quantity})
}

export const all_product_inventory = async () => {
    return (await (await axios.get(`${proxy}`)).data)
}

export const get_product_inventory_by_id = async (_id) => {
    return (await (await axios.get(`${proxy}/${_id}`)).data)
}

export const delete_product_inventory = async (_id) => {
    await axios.delete(`${proxy}/${_id}`)
}

export const update_product_inventory = async (_id, quantity) => {
    await axios.put(`${proxy}/${_id}`, {quantity})
}