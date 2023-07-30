import React from "react";
import "./add_products.css";
import { add_supplier } from "../api/supplier_access";

function CreateSupplier() {

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
    </div>
  );
}

export default CreateSupplier;