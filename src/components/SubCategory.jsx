import { React, useState, useEffect } from "react";
import * as main_category from '../api/product_category'
import TrTable from "./trTable";
import "./table.css"
import ViewSubCategory from "./ViewSubCategory";

function SubCategory() {
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
                    <h1>Sub Category</h1>
                </div>
                <div style={{ width: "100%" }}>
                    {categories.map((category, index) => (
                        <ViewSubCategory key={index} name={category.name} id={category._id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SubCategory;
