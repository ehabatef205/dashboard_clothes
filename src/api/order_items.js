import axios from 'axios'
import {backend_url} from '../config'
import {Cookies} from 'react-cookie'
const proxy = `${backend_url}/order_items`

const cookie = new Cookies()


export const add_order_item = async ({order_id, product_id, quantity}) => {
    await axios.post(`${proxy}/create`,{order_id, product_id, quantity})
}

export const all_order_items = async () => {
    return (await (await axios.get(`${proxy}`)).data)
}
export const returns = async () => {
    return (await (await axios.post(`${proxy}/returns`)).data)
}

export const get_order_item_by_id = async (_id) => {
    return (await (await axios.get(`${proxy}/${_id}`)).data)
}

export const delete_order_item = async (_id) => {
    await axios.delete(`${proxy}/${_id}`)
}

export const update_order_item = async (_id,status) => {
    await axios.put(`${proxy}/${_id}`, {status:status})
}

export const update_return_item = async (_id,status) => {
    await axios.put(`${proxy}/${_id}`, {returnrequest:status})
}

export const UserViewOrder =async (id) => {
    const token = cookie.get('AuthAdmin')
    return (await(await axios.post(`${proxy}/userorders`,{id}, {headers: { 'Authorization': token }})))
}
export const UserViewReturn = async (id) => {
    const token = cookie.get('AuthAdmin')
    return (await(await axios.post(`${proxy}/userreturns`,{id}, {headers: { 'Authorization': token }})))
}

export const stat = async () => {
    const token = cookie.get('AuthAdmin')
    return (await (await axios.get(`${proxy}/stat`,{headers: { 'Authorization': token }})).data)
}