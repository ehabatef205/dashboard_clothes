import { React, useState, useEffect } from "react";
import UserOrders from "./UserOrders";


import * as OrdersApi from '../../api/order_items'
export default function UserButtons(props) {
    const [status, setStatus] = useState("");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            let O = [];
            if (status === "Returns") {
                O = await OrdersApi.UserViewReturn(props.id);
            } else if (status === "Orders") {
                O = await OrdersApi.UserViewOrder(props.id);
            }
           
            setOrders(O.data);
        }

        fetchOrders();
    }, [status]);

    

    const Click=async(B)=>{
        console.log(B)
        if(status===B){
            setStatus("")
        }
        else{
            setStatus(B)  
        }
    }
return(
    <>
    <div
            style={{
              marginTop: "3px",
              marginBottom: "3px",
              borderTop: "2px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <button
                onClick={() => Click("Orders")} 
              style={ButtonStyle}
            >
              Orders
            </button>
            <button
                onClick={() => Click("Returns")} 
              style={ButtonStyle}
            >
              Returns
            </button>
          </div>
          <>
          {status==="" ?<></>
          :
          (
            orders?.map((order, index) => (
                <UserOrders key={index} order={order} />
            ))
        )

          }
          </>
          </>
)


}
const ButtonStyle={
    width: "50%",
    borderRadius: "30px",
    border: "2px gray solid",
    height: "50px",
    fontSize: "24px",
  }