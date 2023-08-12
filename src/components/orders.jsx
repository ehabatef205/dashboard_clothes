    import { React, useState, useEffect } from "react";
    import * as OrdersApi from '../api/order_items'
    import "./table.css"
    import ViewOrders from "./ViewOrdes";

    function Orders() {
        const options = ["processing", "shipping", "completed","hold","cancelled"];
        const [OrderList, setOrderList] = useState([])
        const [stat, setStat] = useState([])
        const [check, setcheck] = useState([])
        const [selectedOption, setSelectedOption] = useState("");
        


        const handleOptionChange = (event) => {
            setSelectedOption(event.target.value);
        
        };
        
        const changed = (index,bool) => {
            
    const newArray = [...check];
 
    newArray[index] = bool;

    setcheck(newArray);
        };
        const apply=()=>{
            const selectedIDs = OrderList
             .filter((_, index) => check[index]) 
             .map(obj => obj._id);
             OrdersApi.update_many_items(selectedIDs,selectedOption)
        }
        

        useEffect(() => {
            const GetOrderList = async () => {
                await OrdersApi.all_order_items().then(e => {
                    setOrderList(e)
                    const initializedArray = Array.from({ length:e.length }, () => false);
                    setcheck(initializedArray)
                })
                await OrdersApi.stat().then(e=>{
                    setStat(e.response)
                })
            }

            GetOrderList()
        }, [])
    

        return (
            <div>
                <div className="add">
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
                    <div className="w-100  addheder col-12 " style={{ borderBottom: "1px solid gray", textAlign: "center" ,display:"flex",flex:"row",justifyContent:"space-around"}} >
                    
                    <select value={selectedOption} onChange={handleOptionChange}>
                        {options.map((option, index) => (
                        <option key={index} value={option}>
                    {option}
                </option>
                ))}
                        </select>
                        <button onClick={apply} >
        Apply
      </button>
                    </div>  
                    
                        

                    <div style={{ width: "100%" }}>
                        {OrderList.map((Order, index) => (
                            <ViewOrders key={index} order={Order} index={index}  changed={changed}
                            
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    export default Orders
