import axios from 'axios'
import {backend_url} from '../config'
import {Cookies} from 'react-cookie'
const proxy = `${backend_url}/user-payment`

const cookie = new Cookies()
const token = cookie.get('Auth')

export const view_user_payment = async () => {
    return (await axios.get(`${proxy}/view_user_payment`, {headers: { 'Authorization': token }})).data
}

export const create_user_payment = async ({payment_type, provider, account_no, expiry}) => {
    return axios.post(`${proxy}/create_user_payment`, {payment_type, provider, account_no, expiry}, {headers: { 'Authorization': token }})
}

export const update_user_payment = async ({payment_type, provider, account_no, expiry}) => {
    return axios.patch(`${proxy}/update_user_payment`, {payment_type, provider, account_no, expiry}, {headers: { 'Authorization': token }})
}

export const delete_user_payment = async () => {
    return axios.delete(`${proxy}/delete_user_payment`, {headers: { 'Authorization': token }})
}