import { React, useState, useEffect } from "react";
import * as OrdersApi from '../api/order_items'
import "./table.css"
import ViewReturns from "./Viewreturns";

function Returns() {
    const [OrderList, setOrderList] = useState([])
    

    useEffect(() => {
        const GetOrderList = async () => {
            await OrdersApi.returns().then(e => {
            
                setOrderList(e)
            })
        }
        GetOrderList()
    }, [])

    return (
        <div>
            <div className="add   ">
                <div className="w-100  addheder col-12" style={{ borderBottom: "1px solid gray", textAlign: "center" }} >
                    {" "}
                    <h1>Returns</h1>
                </div>
                <div style={{ width: "100%" }}>
                    {OrderList.map((Order, index) => (
                        <ViewReturns key={index} order={Order} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Returns
