import axios from 'axios'
import { backend_url } from '../config'
const proxy = `${backend_url}/product`

export const add_product = async (supplier_id, category_id, subCategory, typeOfProduct, name, quantity, SKU, price_before, price_after, imageSrc, color, type, nameOfBrand, logo, description, s, m, l, xl, xxl) => {
    await axios.post(`${proxy}/upload`,
        {
            supplier_id: supplier_id,
            category_id: category_id,
            subCategory: subCategory,
            typeOfProduct: typeOfProduct,
            name: name,
            quantity: quantity,
            SKU: SKU,
            price_before: price_before,
            price_after: price_after,
            imageSrc: imageSrc,
            desc: {
                color: color,
                type: type,
                brand: {
                    name: nameOfBrand,
                    logo: logo,
                },
                description: description,
            },
            sizes: {
                s: s,
                m: m,
                l: l,
                xl: xl,
                xxl: xxl
            },
            view: true
        })
}

export const add_product_from_excel = async (excel) => {
    await axios.post(`${proxy}/excel`, excel, { headers: { 'content-type': 'multipart/form-data', } })
}
export const searchpage=async(query)=>{
    return await((await axios.post(`${proxy}/searchpage/`,{query})).data)
}
export const add_products_from_excel = async (products) => {
    await axios.post(`${proxy}/from_excel`, { products: products })
}

export const all_product = async () => {
    return (await (await axios.get(`${proxy}`)).data)
}

export const get_product_by_id = async (_id) => {
    return (await (await axios.get(`${proxy}/${_id}`)).data)
}

export const delete_product = async (_id) => {
    await axios.delete(`${proxy}/${_id}`)
}

export const update_product = async (_id, typeOfProduct, name, quantity, SKU, price_before, price_after, imageSrc, color, type, nameOfBrand, logo, description, s, m, l, xl, xxl) => {
    await axios.put(`${proxy}/${_id}`, {
        typeOfProduct: typeOfProduct,
        name: name,
        quantity: quantity,
        SKU: SKU,
        price_before: price_before,
        price_after: price_after,
        imageSrc: imageSrc,
        desc: {
            color: color,
            type: type,
            brand: {
                name: nameOfBrand,
                logo: logo,
            },
            description: description,
        },
        sizes: {
            s: s,
            m: m,
            l: l,
            xl: xl,
            xxl: xxl
        },
        view: true
    })
}

export const update_view_product = async (id, view) => {
    await axios.put(`${proxy}/view/${id}`, { view: view })
}

export const get_product_by_category = async (_id) => {
    return (await (await axios.get(`${proxy}/category2/${_id}`)).data)
}

export const get_product_by_type = async (_id, type) => {
    return (await (await axios.post(`${proxy}/type/${_id}`, { typeOfProduct: type })).data)
}


