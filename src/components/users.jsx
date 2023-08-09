import { React, useState, useEffect } from "react";
import {getall} from '../api/user'
import "./table.css"
import UserList from "./UsersList";

function UserView() {
    const [Users, setUsers] = useState([])
    const GetUsers = async () => {
        await getall().then(e => {
          
            setUsers(e)
        })
    }

    useEffect(() => {
        
        GetUsers()
    }, [])

    return (
        <div>
            <div className="add   ">
                <div className="w-100  addheder col-12" style={{ borderBottom: "1px solid gray", textAlign: "center" }} >
                    {" "}
                    <h1>Users</h1>
                </div>
                <div style={{ width: "100%" }}>
                    {Users.map((User, index) => (
                        <UserList key={index} User={User} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserView
