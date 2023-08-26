import React from "react";
import "./add_products.css";
import "./subblier.css";
import { add_supplier } from "../api/supplier_access";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from "react-router-dom";
import { useState } from "react";

const CreateSupplier = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData, [name] : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = {}
    if(!formData.name.trim()) {
        validationErrors.name = "name is required"
    }

    if(!formData.email.trim()) {
        validationErrors.email = "email is required"
    } else if(!/\S+@\S+\.\S+/.test(formData.email)){
        validationErrors.email = "email is not valid"
    }

    if(!formData.password.trim()) {
        validationErrors.password = "password is required"
    } else if(formData.password.length < 6){
        validationErrors.password = "password should be at least 6 char"
    }

    setErrors(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
        alert("Form Submitted successfully")
        add_supplier(formData.name,formData.email,formData.password).then(e=>{
          toast.success("Done ", {
            position: toast.POSITION.TOP_RIGHT
          })
        })
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>name:</label>
        <input
          type="text"
          name="name"
          placeholder='name'  
          autoComplete='off'  
          onChange={handleChange}   
        />
          {errors.username && <span>{errors.username}</span>}  
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder='example@gmail.com'
          autoComplete='off'
          onChange={handleChange} 
        />
          {errors.email && <span>{errors.email}</span>}  
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder='******'
          onChange={handleChange} 
        />
          {errors.password && <span>{errors.password}</span>}  
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateSupplier;















/* function CreateSupplier() {

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    add_supplier(formData.name,formData.email,formData.password)
    toast.success("Done ", {
      position: toast.POSITION.TOP_RIGHT
    })
  };

  return (
    <div>
      <div className="add   ">
        <div className="w-100  addheder col-12" style={{ borderBottom: "1px solid gray", textAlign: "center" }} >
          {" "}
          <h1>create supplier</h1>
        </div>
        <form className=" col-12 h-75 my-5" onSubmit={handleSubmit}>
          <div
            className="d-flex flex-wrap "
          >
            <div className="col-lg-6 items col-12 ">
              <div className="col-12 m-2 ">
                <label className="w-100" >
                  Name
                </label>
                <input style={{ border: "1px solid gray" }}
                  className="w-100 btn"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                  id="name"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="col-12 m-2 ">
                <label className="w-100" >
                  email
                </label>
                <input style={{ border: "1px solid gray" }}
                  className="w-100 btn"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  id="email"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="col-12 m-2 ">
                <label className="w-100" >
                  password
                </label>
                <input style={{ border: "1px solid gray" }}
                  className="w-100 btn"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  id="password"
                  placeholder="Enter password"
                  required
                />
              </div>
              
              </div>
            <button type="submit" className="col-12 m-1 my-4 btn btn-secondary  ">
              create
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateSupplier; */