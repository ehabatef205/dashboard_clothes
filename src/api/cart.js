import axios from 'axios'
import { backend_url } from '../config'
import {Cookies} from 'react-cookie'
const proxy = `${backend_url}/cart/`

const cookie = new Cookies()

export const add_cart = async (product_id, quantity, token) => {
    await axios.post(`${proxy}`, { product_id: product_id, quantity: quantity }, { headers: { authorization: token } })
}
export const get_cart = async () => {
    const token = await cookie.get('Auth')
    return (await(await axios.get(`${proxy}`, {headers: { 'Authorization': token }})).data.response)
}
export const Delete_cart_item = async (  _id) => {
    const token = await cookie.get('Auth')
    await axios.delete(`${proxy}/${_id}`, {  }, { headers: { authorization: token } })
}
export const increse_item = async (  _id) => {
    const token = await cookie.get('Auth')
    await axios.put(`${proxy}/plus/${_id}`, {  }, { headers: { authorization: token } })
}
export const decrease_item = async (  _id) => {
    const token = await cookie.get('Auth')
    await axios.put(`${proxy}/minus/${_id}`, {  }, { headers: { authorization: token } })
}