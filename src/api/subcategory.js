import axios from 'axios'
import { backend_url } from '../config'
const proxy = `${backend_url}/subcategory`


export const all_sub_category = async (id) => {
    return (await (await axios.get(`${proxy}/main_category/${id}`)).data)
}

export const all_sub_category2 = async (id) => {
    return (await (await axios.get(`${proxy}/main_category2/${id}`)).data)
}

export const get_product_category_by_id = async (_id) => {
    return (await (await axios.get(`${proxy}/${_id}`)).data)
}

export const delete_sub_category = async (_id) => {
    await axios.delete(`${proxy}/${_id}`)
}

export const update_sub_category = async (_id, name) => {
    await axios.put(`${proxy}/${_id}`, { name })
}

export const update_view_subcategory = async (id, view) => {
    await axios.put(`${proxy}/view/${id}`, { view: view })
}