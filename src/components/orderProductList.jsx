import { React, useState } from "react";

import "./style.css"
import "./table.css"

export default function OrderProductList(props) {
    

    return (
        <>
        {props.products.map((product)=>(
            <tr>
                <td>{product.name}</td>
                <td>   <img src={product.image}></img></td>
                <td>count:{product.quantity}</td>
                <td>SKU:{product.SKU}</td>
            </tr>)
        )}
        </>)}
