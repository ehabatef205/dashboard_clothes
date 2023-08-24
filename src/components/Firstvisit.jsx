import React, { useEffect, useState } from 'react'
import "./hidden.css"
import * as main_category from '../api/product_category'
import * as sub_category from '../api/subcategory'
import * as product from '../api/product'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Firstvisit() {
    const [categories, setCategories] = useState([])
    const [selectedCategoryValue, setSelectedCategoryValue] = useState("");

    const [numberOfFirstVisit, setNumberOfFirstVisit] = useState(0)

    const [products, setProducts] = useState([])

    const handleSelectCategory = (event) => {
        setSelectedCategoryValue(event.target.value);
        getProducts(event.target.value)
        getProductsFirstVisit(event.target.value)
    };

    useEffect(() => {
        const getCategory = async () => {
            await main_category.all_product_category().then(e => {
                setCategories(e.response)
                setSelectedCategoryValue(e.response[0]._id)
                getProducts(e.response[0]._id)
                getProductsFirstVisit(e.response[0]._id)
            })
        }
        getCategory()
    }, [])

    const getProducts = async (id) => {
        await product.get_product_by_main_category(id).then(e => {
            setProducts(e.response)
            console.log(e.response)
        })
    }

    const getProductsFirstVisit = async (id) => {
        await product.get_product_first_visit(id).then(e => {
            console.log(e.response.length)
            setNumberOfFirstVisit(e.response.length)
        })
    }

    const decrease = async () => {
        setNumberOfFirstVisit(numberOfFirstVisit - 1)
    }

    const increase = async () => {
        setNumberOfFirstVisit(numberOfFirstVisit + 1)
    }

    return (
        <div>
            <div className='hidden bg-light mx-5 '>
                <h1 className='col-12 ' style={{ borderBottom: "1px solid gray", textAlign: "center" }} >First visit products</h1>

                <form className='col-12  m-2'>
                    <div
                        className="d-flex flex-wrap "
                    >
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
                        <table>
                            <thead>
                                <tr>
                                    <th>index</th>
                                    <th>Name</th>
                                    <th>selection</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product1, index) => (
                                    <FirstProduct key={index} index={index + 1} product={product1} increase={increase} decrease={decrease} numberOfFirstVisit={numberOfFirstVisit} />
                                ))}

                            </tbody>
                        </table>

                    </div>
                </form>
                <div className='w-100 m-5 d-flex justify-content-center' >
                    <button className='btn w-50 btn-outline-secondary'
                    // onClick={}
                    >add as First visit </button>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}



function FirstProduct(props) {

    const [visited, setvisited] = useState(props.product.first_visit)
    const first = async (id) => {
        if (props.numberOfFirstVisit <= 7 || visited) {
            await product.update_first_visit(id, !visited).then(res => {
                console.log(props.numberOfFirstVisit);
                setvisited(!visited)

                if (visited === true) {
                    props.decrease();
                    toast.error("The product is not first visit ", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                } else {
                    props.increase();
                    toast.success("The product is first visiteded ", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                }
            })
        } else {
            toast.warn("You must remove an old first visit product", {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    return (
        <tr>
            <td>{props.index}</td>
            <td>{props.product.name}</td>
            <td><input type="checkbox" checked={visited} onChange={() => { first(props.product._id) }} style={{ height: "18px", width: "18px" }} /></td>
        </tr>

    )
}

export { FirstProduct }
