import { React, useState } from "react";
import { MdDoneOutline } from "react-icons/md"
import { FaSpinner } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import * as sub_category from '../api/subcategory'
import "./style.css"
import "./table.css"

export default function TableOfProduct(props) {
    const [name, setName] = useState(props.name)
    const [view, setView] = useState(props.view)
    const [loading, setLoading] = useState(false)

    const update = async () => {
        setLoading(true)
        sub_category.update_sub_category(props.id, name).then(res => {
            setLoading(false)
            console.log(res)
        })
    }

    const hidden = async () => {
        await sub_category.update_view_subcategory(props.id, !view).then(res => {
            setView(!view)
        })
    }

    return (
        <tr>
            <td>{props.index}</td>
            <td><input value={name} type="text" onChange={(e) => { setName(e.target.value) }} /></td>
            <td>{loading ? <FaSpinner icon="spinner" className="icon_pulse" style={{ fontSize: "25px" }} /> : <MdDoneOutline style={{ fontSize: "25px", cursor: "pointer" }} onClick={() => {update()}} />}</td>
            <td><input type="checkbox" checked={view} onChange={() => { hidden() }} style={{ height: "18px", width: "18px" }} /></td>
        </tr>
    );
}
