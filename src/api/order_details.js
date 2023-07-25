import axios from 'axios'
import {backend_url} from '../config'
const proxy = `${backend_url}/order_details`

export const add_order_details = async ({user_id, total, payment_id}) => {
    await axios.post(`${proxy}/create`,{user_id, total, payment_id})
}

export const all_order_details = async () => {
    return (await (await axios.get(`${proxy}`)).data)
}

export const get_order_detail_by_id = async (_id) => {
    return (await (await axios.get(`${proxy}/${_id}`)).data)
}

export const delete_order_detail = async (_id) => {
    await axios.delete(`${proxy}/${_id}`)
}

export const update_order_detail = async (_id,{user_id, total, payment_id}) => {
    await axios.put(`${proxy}/${_id}`, {user_id, total, payment_id})
}