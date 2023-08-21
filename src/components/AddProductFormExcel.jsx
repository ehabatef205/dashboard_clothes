import React, { useState, useEffect } from "react";
import "./add_products.css";
import * as product from '../api/product'
import axios from "axios";
import * as main_category from '../api/product_category'
import * as sub_category from '../api/subcategory'
import { AiOutlineDelete } from 'react-icons/ai';

function AddProductFromExcel() {
    const [products, setProducts] = useState([])
    const [excel, setExcel] = useState()
    const [categories, setCategories] = useState([])
    const [selectedCategoryValue, setSelectedCategoryValue] = useState("");

    const [subCategories, setSubCategories] = useState([])
    const [selectedSubCategoryValue, setSelectedSubCategoryValue] = useState("");

    function handleChange(event) {
        setExcel(event.target.files[0])
    }

    const handleSelectCategory = (event) => {
        setSelectedCategoryValue(event.target.value);
        getSubCategory(event.target.value)
    };

    const handleSelectSuCategory = (event) => {
        setSelectedSubCategoryValue(event.target.value);
    };

    const getSubCategory = async (id) => {
        await sub_category.all_sub_category(id).then(e => {
            setSubCategories(e.response)
            if (e.response.length !== 0) {
                setSelectedSubCategoryValue(e.response[0]._id)
            } else {
                setSelectedSubCategoryValue("")
            }
        })
    }

    useEffect(() => {
        const getCategory = async () => {
            await main_category.all_product_category().then(e => {
                setCategories(e.response)
                setSelectedCategoryValue(e.response[0]._id)
                getSubCategory(e.response[0]._id)
            })
        }
        getCategory()
    }, [])

    const getDataFromExcel = async () => {
        const url = 'http://localhost:5000/product/excel';
        const formData = new FormData();
        formData.append('excel', excel);
        formData.append('category_id', selectedCategoryValue);
        formData.append('subCategory', selectedSubCategoryValue);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios.post(url, formData, config).then((response) => {
            setProducts(response.data.data);
        });
    }

    const addProducts = async () => {
        await product.add_products_from_excel(products).then(e => {
            console.log("Done")
            setProducts([])
        })
    }

    const deleteProduct = async (product2) => {
        setProducts((current) =>
            current.filter((fruit) => fruit !== product2)
        );
    }

    return (
        <div>
            <div className="add">
                <div
                    className="w-100  addheder col-12"
                    style={{ borderBottom: "1px solid gray", textAlign: "center" }}
                >
                    <h1>Add Product From Excel</h1>
                </div>
                <div className="col-12 m-2 ">
                    <label className="w-50" htmlFor="description">
                        Category
                    </label>
                    <select
                        value={selectedCategoryValue}
                        style={{ width: "50%" }}
                        onChange={handleSelectCategory}
                    >
                        {categories.map((category) => (
                            <option key={category._id} value={category._id} >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-12 m-2 ">
                    <label className="w-50" htmlFor="description">
                        Sub category
                    </label>
                    <select
                        value={selectedSubCategoryValue}
                        style={{ width: "50%" }}
                        onChange={handleSelectSuCategory}
                    >
                        {subCategories.map((subCategory) => (
                            <option key={subCategory._id} value={subCategory._id} >
                                {subCategory.name}
                            </option>
                        ))}
                    </select>
                </div>
                <input type="file" onChange={handleChange} />
                {excel !== null ? <button onClick={() => { getDataFromExcel() }}>Upload</button> : <></>}
                <div className=" col-12 h-75 my-5 ">
                    <div
                        className="d-flex flex-wrap "
                    >
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Quantity</th>
                                    <th>SKU</th>
                                    <th>OP</th>
                                    <th>NP</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product1, index) => (
                                    <tr key={index}>
                                        <td>{product1.name}</td>
                                        <td>{product1.typeOfProduct}</td>
                                        <td>{product1.quantity}</td>
                                        <td>{product1.SKU}</td>
                                        <td>{product1.price_before}</td>
                                        <td>{product1.price_after}</td>
                                        <td><AiOutlineDelete style={{ fontSize: "25px", cursor: "pointer" }} onClick={() => { deleteProduct(product1) }} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={(action) => { addProducts(action) }}>Add product</button>
                </div>
            </div>
        </div>
    );
}

export default AddProductFromExcel;