import { React, useState, useEffect } from "react";
import * as OrdersApi from '../api/order_items'
import "./table.css"
import ViewOrders from "./ViewOrdes";

function Orders() {
    const [OrderList, setOrderList] = useState([])
    const [stat, setStat] = useState([])
    

    useEffect(() => {
        const GetOrderList = async () => {
            await OrdersApi.all_order_items().then(e => {
                setOrderList(e)
            })
            await OrdersApi.stat().then(e=>{
                setStat(e.response)
            })
        }

        GetOrderList()
    }, [])

    return (
        <div>
            <div className="add   ">
                <div className="w-100  addheder col-12" style={{ borderBottom: "1px solid gray", textAlign: "center" }} >
                    {" "}
                    <h1>Orders</h1>
                </div>
                <div className="w-100  addheder col-12 " style={{ borderBottom: "1px solid gray", textAlign: "center" ,display:"flex",flex:"row",justifyContent:"space-around"}} >
                    {" "}
                    <h3>all: {stat[0]||0}</h3>
                    <h3>completed: {stat[1]||0}</h3>
                    <h3>cancelled: {stat[2]||0}</h3>
                </div>
                <div style={{ width: "100%" }}>
                    {OrderList.map((Order, index) => (
                        <ViewOrders key={index} order={Order} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Orders
