import axios from 'axios'
import {backend_url} from '../config'

const proxy = `${backend_url}/admin`


export const login = async ({email, password}) => {
    return axios.post(`${proxy}`,{email, password})
}