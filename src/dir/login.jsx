import { React, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as admin from '../api/ADMIN'
import { Cookies } from 'react-cookie'



export default function Login({ onLogin }) {
    const cookie = new Cookies()


    const [loading, setLoading] = useState(false)

    const emailRef = useRef(null);
    const passwordRef = useRef(null);


    const logIn = async () => {
        setLoading(true);
        cookie.remove("AuthAdmin")
        await admin.login({ email: emailRef.current.value, password: passwordRef.current.value }).then(async (res) => {
            const message = res.data.message;

            if (message === 'Login Successful!') {
                setLoading(false);
                cookie.set("AuthAdmin", "Bearer " + res.data.token);
                console.log(res.data.token)
                onLogin()
            } else if (message === "Id or password is invalid") {
                toast.warning(message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                setLoading(false);
            } else {
                setLoading(false);
            }
        }).catch((error) => {
            setLoading(false);
        })
    };


    return (
        <div>
            <div
                className="login"
                style={login}
            >
                <div className="" style={{ flexDirection: "column", height: "fit-content", width: "100vw", justifyContent: "center", alignItems: "center", display: "flex" }}>
                    <h4> Super Admin LogIn</h4>
                    <input
                        ref={emailRef}
                        style={inputText}
                        placeholder="E-mail"
                        type="email"
                    />
                    <input
                        ref={passwordRef}
                        style={inputText}
                        placeholder="password"
                        type="password"
                    />
                    {!loading && <button onClick={logIn} style={loginButton}>
                        Login
                    </button>}
                    {loading && <button style={loginButton2} disabled>
                        Login...
                    </button>}
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

const login = {
    position: "relative",
    backgroundColor: "#e7e7e7",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
    height: "100vh"
};

const inputText = {
    border: "1px solid #000",
    borderRadius: "15px",
    width: "50%",
    padding: "10px",
    marginTop: "20px"
}

const loginButton = {
    marginTop: "20px",
    border: "none",
    backgroundColor: "rgb(0, 111, 225)",
    width: "40%",
    color: "#fff",
    padding: "10px",
    borderRadius: "15px",
}

const loginButton2 = {
    marginTop: "20px",
    border: "none",
    backgroundColor: "rgb(0, 111, 225)",
    width: "40%",
    color: "#fff",
    padding: "10px",
    borderRadius: "15px",
}