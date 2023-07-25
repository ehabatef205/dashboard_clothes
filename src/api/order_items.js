import axios from 'axios'
import {backend_url} from '../config'
const proxy = `${backend_url}/order_items`

export const add_order_item = async ({order_id, product_id, quantity}) => {
    await axios.post(`${proxy}/create`,{order_id, product_id, quantity})
}

export const all_order_items = async () => {
    return (await (await axios.get(`${proxy}`)).data)
}

export const get_order_item_by_id = async (_id) => {
    return (await (await axios.get(`${proxy}/${_id}`)).data)
}

export const delete_order_item = async (_id) => {
    await axios.delete(`${proxy}/${_id}`)
}

export const update_order_item = async (_id,{order_id, product_id, quantity}) => {
    await axios.put(`${proxy}/${_id}`, {order_id, product_id, quantity})
}