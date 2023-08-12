import { React, useState, useEffect } from "react";
import {getall,search} from '../api/user'
import "./table.css"
import UserList from "./UsersList";

function UserView() {
    const [Users, setUsers] = useState([])
    const [query, setquery] = useState([])
    const GetUsers = async () => {
        await getall().then(e => {
          
            setUsers(e)
        })
    }

    useEffect(() => {
        
        GetUsers()
    }, [])

    const searchusers = async (query) => {
        await search(query).then(e => {
            setUsers(e)
        })
    }
    
    useEffect(() => {
        if(query!==""){
            searchusers(query)
        }
        else{
            GetUsers()
        }
    }, [query])

    return (
        <div>
            <div className="add   ">
                <div className="w-100  addheder col-12" style={{ borderBottom: "1px solid gray", textAlign: "center" }} >
                    {" "}
                    <h1>Users</h1>
                </div>
                <div className="w-100  addheder col-12" style={{ borderBottom: "1px solid gray", textAlign: "center" }} >
                    {" "}
                    <input type="text" value={query}  onChange={(e)=>{setquery(e.target.value)}}/>
                </div>
                <div style={{ width: "100%" }}>
                    {Users?.map((User, index) => (
                        <UserList key={index} User={User} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserView
