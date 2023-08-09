import { React, useState, useEffect } from "react";
import * as supplier from '../api/supplier_access'
import "./table.css"
import { MdDoneOutline,MdOutlineRemoveDone  } from "react-icons/md"




function SupplierList() {
    const [suppliers, setSuppliers] = useState([])
    const getSuppliers = async () => {
        await supplier.allsupliers().then((e) => {
            setSuppliers(e.data.response)
        })
    }
    useEffect(() => {
        
        getSuppliers()
    }, [])
    const enable=async(id,name)=>{
        await supplier.enable(id,name).then(e=>{
            getSuppliers()
        })
    }
    const disable=async(id,name)=>{
        await supplier.disable(id,name).then(e=>{
            getSuppliers()
        })
    }
    return (
        <div>
            <div className="add   ">
                <div className="w-100  addheder col-12" style={{ borderBottom: "1px solid gray", textAlign: "center" }} >
                    {" "}
                    <h1>suppliers</h1>
                </div>
                <div style={{ width: "100%" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>email</th>
                                <th>visable</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map((supplier, index) => (
                                 <tr>
                                 <td>{supplier.name}</td>
                                 <td><i> {supplier.email}   </i></td>
                                 <td>{supplier.enabled ? (<MdDoneOutline style={{ fontSize: "25px", cursor: "pointer" }} onClick={() => { disable(supplier._id,supplier.name) }} />):
                                 (<MdOutlineRemoveDone style={{ fontSize: "25px", cursor: "pointer" }} onClick={() => { enable(supplier._id,supplier.name) }}/>)}</td>
                             </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SupplierList;