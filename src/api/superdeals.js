import axios from 'axios'
import {backend_url} from '../config'
import {Cookies} from 'react-cookie'
const proxy = `${backend_url}/superdeals`

const cookie = new Cookies()



export const getall = async () => {
    return await (await(axios.get(`${proxy}`)).data)
}
export const create = async (name,products,avilablethrough,price,quantity) => {
    const token = cookie.get('AuthAdmin')
    return  (await( await axios.post(`${proxy}/`,{name:name,products:products,avilablethrough:avilablethrough,price:price,quantity:quantity },{headers: { 'Authorization': token }})).data)
}

