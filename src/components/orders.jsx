import { React, useState, useEffect } from "react";
import * as OrdersApi from "../api/order_items";
import "./table.css";
import ViewOrders from "./ViewOrdes";

function Orders() {
  const options = ["processing", "shipping", "completed", "hold", "cancelled"];
  const [OrderList, setOrderList] = useState([]);
  const [stat, setStat] = useState([]);
  const [check, setcheck] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [statusfilter, setstatusfilter] = useState("");
  const [monthFilter, setmonthFilter] = useState("");
  const [monthsArray, setMonthsArray] = useState([]);

  useEffect(() => {
    const startDate = new Date("2023-06-01"); // Change this to your desired start date
    const currentDate = new Date();

    const monthsPassed = [];
    let currentDatePointer = startDate;

    while (currentDatePointer <= currentDate) {
      const year = currentDatePointer.getFullYear();
      const month = currentDatePointer.getMonth() + 1;
      monthsPassed.push(`${month}/${year}`);
      currentDatePointer.setMonth(currentDatePointer.getMonth() + 1);
    }

    setMonthsArray(monthsPassed);
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleStatusChange = (event) => {
    console.log(event.target.value)
    setstatusfilter(event.target.value);
  };
  const handleMonthchange = (event) => {
    console.log(event.target.value)
    setmonthFilter(event.target.value);
  };

  const changed = (index, bool) => {
    const newArray = [...check];

    newArray[index] = bool;

    setcheck(newArray);
  };
  const apply = () => {
    const selectedIDs = OrderList.filter((_, index) => check[index]).map(
      (obj) => obj._id
    );
    OrdersApi.update_many_items(selectedIDs, selectedOption).then(e=>{
      filter();
    });
  };
  const filter=async ()=>{
    var query={}
    if(statusfilter!=="")
    query.status=statusfilter
    if(monthFilter!=="")
    query.month=monthFilter

    await OrdersApi.filter(query).then(e=>setOrderList(e))

}


  useEffect(() => {
    const GetOrderList = async () => {
      await OrdersApi.all_order_items().then((e) => {
        setOrderList(e);
        const initializedArray = Array.from({ length: e.length }, () => false);
        setcheck(initializedArray);
      });
      await OrdersApi.stat().then((e) => {
        setStat(e.response);
      });
    };

    GetOrderList();
  }, []);

  return (
    <div>
      <div className="add">
        <div
          className="w-100  addheder col-12"
          style={{ borderBottom: "1px solid gray", textAlign: "center" }}
        >
          {" "}
          <h1>Orders</h1>
        </div>
        <div
          className="w-100  addheder col-12 bg-secondary-subtle "
          style={{
            borderBottom: "1px solid gray",
            textAlign: "center",
            display: "flex",
            flex: "row",
            justifyContent: "space-around",
          }}
        >
          {" "}
          <h3>all: {stat[0] || 0}</h3>
          <h3>completed: {stat[1] || 0}</h3>
          <h3>cancelled: {stat[2] || 0}</h3>
        </div>
        <div
          className="w-100  addheder col-12 "
          style={{
            borderBottom: "1px solid gray",
            textAlign: "center",
            display: "flex",
            flex: "row",
            justifyContent: "space-around",
          }}
        >
          <h5>filter</h5>
          <div style={{backgroundColor:statusfilter===""?"transparent":"red"}}>
            status :
            <select value={statusfilter}  onChange={handleStatusChange}>
            <option value={""}>
                none
              </option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div style={{backgroundColor:monthFilter===""?"transparent":"red"}}>
            date :
            <select value={monthFilter} onChange={handleMonthchange}>
            <option value={""}>
                none
              </option>
              {monthsArray.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button onClick={filter}>Apply</button>
        </div>

        <div
          className="w-100  addheder col-12 "
          style={{
            borderBottom: "1px solid gray",
            textAlign: "center",
            display: "flex",
            flex: "row",
            justifyContent: "space-around",
          }}
        >
          <select value={selectedOption} onChange={handleOptionChange}>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button onClick={apply}>Apply</button>
        </div>

        <div style={{ width: "100%" }}>
          {OrderList.map((Order, index) => (
            <ViewOrders
              key={index}
              order={Order}
              index={index}
              changed={changed}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
