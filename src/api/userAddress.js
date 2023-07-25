import axios from 'axios'
import {backend_url} from '../config'
import {Cookies} from 'react-cookie'
const proxy = `${backend_url}/user-address`

const cookie = new Cookies()
const token = cookie.get('Auth')

export const view_user_payment = async () => {
    return (await axios.get(`${proxy}/view_user_address`, {headers: { 'Authorization': token }})).data
}

export const create_user_address = async ({address_line1, address_line2, city, postal_code ,country, telephone, mobile}) => {
    return await axios.post(`${proxy}/create_user_address`, {address_line1, address_line2, city, postal_code ,country, telephone, mobile}, {headers: { 'Authorization': token }})
}

export const update_user_address = async ({address_line1, address_line2, city, postal_code ,country, telephone, mobile}) => {
    return await axios.put(`${proxy}/update_user_address`, {address_line1, address_line2, city, postal_code ,country, telephone, mobile}, {headers: { 'Authorization': token }})
}

export const delete_user_address = async () => {
    return await axios.delete(`${proxy}/delete_user_address`, {headers: { 'Authorization': token }})
}