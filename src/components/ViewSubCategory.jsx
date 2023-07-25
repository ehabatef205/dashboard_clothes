import { React, useState, useEffect } from "react";
import { MdDoneOutline } from "react-icons/md"
import { AiOutlineDown } from 'react-icons/ai'
import { AiOutlineUp } from 'react-icons/ai'
import * as sub_category from '../api/subcategory'
import "./style.css"
import "./table.css"
import TableOfProduct from "./TableOfSubCategory";

export default function ViewSubCategory(props) {
    const [open, setOpen] = useState(false)
    const [subCategories, setSubCategories] = useState([])

    useEffect(() => {
        const getCategory = async () => {
            await sub_category.all_sub_category(props.id).then(e => {
                setSubCategories(e.response)
            })
        }
        getCategory()
    }, [])

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <>
            <div style={nameStyle} onClick={handleClick}>
                <div style={{ display: "inline-block", fontSize: "20px" }}>
                    {props.name}
                </div>
                {open? <AiOutlineUp style={{ fontSize: "20px" }} /> : <AiOutlineDown style={{ fontSize: "20px" }} />}
            </div>
            {open? <div style={{ width: "100%" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>index</th>
                                <th>Name</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subCategories.map((subCategory, index) => (
                                <TableOfProduct key={index} index={index + 1} id={subCategory._id} name={subCategory.name} />
                            ))}
                        </tbody>
                    </table>
                </div> : <></>}
        </>
    );
}

const nameStyle = {
    padding: "10px",
    width: "100%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
}