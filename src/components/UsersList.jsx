import { React, useState, useEffect } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import UserButtons from "./UserButtons/EndElement";
import "./style.css";
import "./table.css";

export default function UserList(props) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div
      style={{ margin: "5px", border: "2px gray solid", borderRadius: "20px" }}
    >
      <div style={nameStyle}>
        <div style={{ display: "inline-block", fontSize: "20px" }}>
          {"Email: " + props.User?.email}
        </div>
        {open ? (
          <AiOutlineUp style={{ fontSize: "20px" }} onClick={handleClick} />
        ) : (
          <AiOutlineDown style={{ fontSize: "20px" }} onClick={handleClick} />
        )}
      </div>
      {open ? (
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <div style={{ display: "inline-block", fontSize: "20px" }}>
              {"Name: " + props.User?.first_name + " " + props.User?.last_name}
            </div>
            <div style={{ display: "inline-block", fontSize: "20px" }}>
              {"UserName: " + props.User?.username}
            </div>
            <div style={{ display: "inline-block", fontSize: "20px" }}>
              {"Telephone: " + props.User?.telephone}
            </div>
          </div>
          <UserButtons id={props.User._id}></UserButtons>
        </div>
      ) : (
        <></>
      )}
    </div>
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
