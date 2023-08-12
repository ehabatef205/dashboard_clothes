import axios from 'axios'
import {backend_url} from '../config'
import {Cookies} from 'react-cookie'
const proxy = `${backend_url}/admin`

const cookie = new Cookies()



export const login = async ({email, password}) => {
    return axios.post(`${proxy}`,{email, password})
}
export const auth = async () => {
    const token = cookie.get('AuthAdmin')
    return  (await( await axios.post(`${proxy}/checkauth`,{},{headers: { 'Authorization': token }})).data)
}

