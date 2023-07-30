import { React, useState, useEffect } from "react";
import * as main_category from '../api/product_category'
import TrTable from "./trTable";
import "./table.css"

function ViewSuppliers() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getCategory = async () => {
            await main_category.all_product_category().then(e => {
                setCategories(e.response)
            })
        }
        getCategory()
    }, [])

    return (
        <div>
            <div className="add   ">
                <div className="w-100  addheder col-12" style={{ borderBottom: "1px solid gray", textAlign: "center" }} >
                    {" "}
                    <h1>View Main Category</h1>
                </div>
                <div style={{ width: "100%" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>index</th>
                                <th>Name</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <TrTable key={index} index={index + 1} id={category._id} name={category.name} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewSuppliers;