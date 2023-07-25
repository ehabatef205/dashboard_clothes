import axios from 'axios'
import {backend_url} from '../config'
const proxy = `${backend_url}/payment_details`

export const add_payment_details = async ({order_id, amount, provider, status}) => {
    await axios.post(`${proxy}`,{order_id, amount, provider, status})
}

export const all_payment_details = async () => {
    return (await (await axios.get(`${proxy}`)).data)
}

export const get_payment_details_by_id = async (_id) => {
    return (await (await axios.get(`${proxy}/${_id}`)).data)
}

export const delete_payment_details = async (_id) => {
    await axios.delete(`${proxy}/${_id}`)
}

export const update_payment_details = async (_id,{order_id, amount, provider, status}) => {
    await axios.put(`${proxy}/${_id}`, {order_id, amount, provider, status})
}