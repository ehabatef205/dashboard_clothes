import { React, useState } from "react";
import { MdDoneOutline } from "react-icons/md"
import { FaSpinner } from 'react-icons/fa';
import * as main_category from '../api/product_category'
import "./style.css"
import "./table.css"

export default function TrTable(props) {
    const [name, setName] = useState(props.name)
    const [loading, setLoading] = useState(false)

    const update = async () => {
        setLoading(true)
        main_category.update_product_category(props.id, name).then(res => {
            setLoading(false)
            console.log(res)
        })
    }

    return (
        <tr>
            <td>{props.index}</td>
            <td><input value={name} type="text" onChange={(e) => { setName(e.target.value) }} /></td>
            <td>{loading ? <FaSpinner icon="spinner" className="icon_pulse" style={{ fontSize: "25px" }} /> : <MdDoneOutline style={{ fontSize: "25px", cursor: "pointer" }} onClick={() => { update() }} />}</td>
        </tr>
    );
}
