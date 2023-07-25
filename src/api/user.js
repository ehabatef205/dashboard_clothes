import axios from 'axios'
import {backend_url} from '../config'
import {Cookies} from 'react-cookie'
const proxy = `${backend_url}/user`

const cookie = new Cookies()
const token = cookie.get('Auth')

export const sign_up = async ({username, email, password, first_name, last_name, telephone}) => {
    return((await axios.post(`${proxy}/sign_up`,{username, email, password, first_name, last_name, telephone})).data)
}

export const login = async ({email, password}) => {
    return axios.post(`${proxy}/login`,{email, password})
}

export const view_profile = async () => {
    return (await axios.get(`${proxy}/view_profile`,{headers: { 'Authorization': token }})).data
}

export const update_profile = async ({first_name, last_name, telephone}) => {
    return await axios.patch(`${proxy}/update_profile`,{first_name, last_name, telephone} ,{headers: { 'Authorization': token }})
}

export const delete_profile = async () => {
    return await axios.delete(`${proxy}/delete_profile`, {headers: { 'Authorization': token }})
}