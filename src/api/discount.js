import axios from 'axios'
import {backend_url} from '../config'
const proxy = `${backend_url}/discount`

export const add_discount = async ({name, disc, active, discount_idpercent}) => {
    await axios.post(`${proxy}`,{name, disc, active, discount_idpercent})
}

export const all_discounts = async () => {
    return await (await axios.get(`${proxy}`)).data
}

export const get_discount_by_id = async (_id) => {
    return await (await axios.get(`${proxy}/${_id}`)).data
}

export const delete_discount = async (_id) => {
    await axios.delete(`${proxy}/${_id}`)
}

export const update_discount = async (_id,{name, disc, active, discount_idpercent}) => {
    await axios.put(`${proxy}/${_id}`, {name, disc, active, discount_idpercent})
}