import { React, useState, useEffect } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import OrderProductList from "./orderProductList";
import "./style.css";
import "./table.css";
import * as OrdersApi from '../api/order_items'

export default function ViewReturns(props) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const options = ["requsted", "Accepted", "Denied"];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    OrdersApi.update_return_item(props.order._id,event.target.value)
  };
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <div style={nameStyle} onClick={handleClick}>
        <div style={{ display: "inline-block", fontSize: "20px" }}>
          {props.order.payment + "   " + props.order.totalPrice}
        </div>
        <div style={{ display: "inline-block", fontSize: "20px" }}>
          {"status:   "}
          <select value={selectedOption} onChange={handleOptionChange}>
          
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {open ? (
          <AiOutlineUp style={{ fontSize: "20px" }} />
        ) : (
          <AiOutlineDown style={{ fontSize: "20px" }} />
        )}
      </div>
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
    </>
  );
}

const nameStyle = {
  padding: "10px",
  width: "100%",
  flexDirection: "row",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
