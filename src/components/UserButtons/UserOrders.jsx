import { React, useState, useEffect } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import OrderProductList from "../orderProductList";


export default function UserOrders(props) {
  
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  

  return (
    <div >

      <table >
        <tbody>
        <tr>
        
        <td >
          #{props.order._id}
        </td>
        <td >
          {props.order.firstName + "   " + props.order.lastName}
        </td>
        <td >
          {props.order.createdAt.substring(0,10)}
        </td>
        <td >
          {props.order.status}
        </td>
        <td >
          {props.order.totalPrice}
        </td>
        
        {open ? (
          <AiOutlineUp style={{ fontSize: "20px" }} onClick={handleClick}/>
        ) : (
          <AiOutlineDown style={{ fontSize: "20px" }}onClick={handleClick} />
        )}</tr>
        </tbody>
      </table>
      {open ? (
        <div style={{ width: "100%" }}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>address</th>
                <th>Country</th>
                <th>phone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.order.firstName + " " + props.order.lastName}</td>
                <td>
                  <i>
                    {" "}
                    {"address:" +
                      props.order.address +
                      " city: " +
                      props.order.city +
                      "  zipCode: " +
                      props.order.zipCode}{" "}
                  </i>
                </td>
                <td>
                  <i>{props.order.country}</i>
                </td>
                <td>
                  <i>{props.order.phone}</i>
                </td>
              </tr>
                <tr >
                    
                <td><div style={{height:"2px",backgroundColor:"black",}}></div></td>
                     <td><div style={{height:"2px",backgroundColor:"black",}}></div></td>
                     <td><div style={{height:"2px",backgroundColor:"black",}}></div></td>
                     <td><div style={{height:"2px",backgroundColor:"black",}}></div></td></tr>
              <OrderProductList
                products={props.order.products}
              ></OrderProductList>
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

const nameStyle = {
  backgroundColor:"#fafafa",
  padding: "10px",
  width: "100%",
  flexDirection: "column",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
