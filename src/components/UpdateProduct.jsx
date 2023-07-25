import React from "react";
import "./add_products.css";
function UpdateProduct() {
  return (
    <div>
      <div className="add">
        <div
          className="w-100  addheder col-12"
          style={{ borderBottom: "1px solid gray", textAlign: "center" }}
        >
          <h1>Update Product</h1>
        </div>
        <form className=" col-12 h-75 my-5 ">
        <div
            className="d-flex flex-wrap " 
          >
            <div className='col-12 d-flex 'style={{textAlign:"center"}} >
          <label className="w-25 my-4 mx-5" htmlFor="ProductID">product id</label>
          <input
          className=' btn my-4 w-50' style={{border:"1px solid gray" }}
            type="text"
            name="productid"
            id="productid"
            placeholder="Enter product id"
            required
          /></div>
          <div className="col-lg-6 items col-12">
          <div className="col-12 m-2 ">
            <label className="w-50" htmlFor="name">Name</label>
            <input
             style={{border:"1px solid gray" }} className="w-50 btn" 
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              required
            /> </div><div className="col-12 m-2 ">
            <label className="w-50" htmlFor="imageSrc">Image Source</label>
            <input
             style={{border:"1px solid gray" }} className="w-50 btn" 
              type="text"
              name="imageSrc"
              id="imageSrc"
              placeholder="Enter Image Source"
              required
            /></div> <div className="col-12 m-2 ">
            <label className="w-50" htmlFor="quantity">Quantity</label>
            <input
             style={{border:"1px solid gray" }} className="w-50 btn" 
              type="number"
              name="quantity"
              id="quantity"
              placeholder="Enter Quantity"
              required
            />
          </div></div>
          <div className="col-lg-6 items col-12">
          <div className="col-12 m-2 ">
            <label className="w-50" htmlFor="SKU">SKU</label>
            <input
             style={{border:"1px solid gray" }} className="w-50 btn" 
              type="text"
              name="SKU"
              id="SKU"
              placeholder="Enter SKU"
              required
            /></div>
             <div className="col-12 m-2 ">
            <label className="w-50" htmlFor="category">Category</label>
            <input
             style={{border:"1px solid gray" }} className="w-50 btn" 
              type="text"
              name="category"
              id="category"
              placeholder="Enter Category"
              required
            /> </div><div className="col-12 m-2 ">
            <label className="w-50" htmlFor="priceBefore">Price Before</label>
            <input
             style={{border:"1px solid gray" }} className="w-50 btn" 
              type="number"
              name="priceBefore"
              id="priceBefore"
              placeholder="Enter Price Before"
              required
            /></div>
          </div>
          <div className="col-lg-6 items col-12">
          <div className="col-12 m-2 ">
            <label className="w-50" htmlFor="priceAfter">Price After</label>
            <input
             style={{border:"1px solid gray" }} className="w-50 btn" 
              type="number"
              name="priceAfter"
              id="priceAfter"
              placeholder="Enter Price After"
              required
            /></div>
             <div className="col-12 m-2 ">
            <label className="w-50" htmlFor="sizes">Sizes</label>
            <input
             style={{border:"1px solid gray" }} className="w-50 btn" 
              type="text"
              name="sizes"
              id="sizes"
              placeholder="Enter Sizes"
              required
            /></div>
             <div className="col-12 m-2 ">
            <label className="w-50" htmlFor="subCategory">Sub Category</label>
            <input
             style={{border:"1px solid gray" }} className="w-50 btn" 
              type="text"
              name="subCategory"
              id="subCategory"
              placeholder="Enter Sub Category"
              required
            /></div>
          </div>
          <div className="col-lg-6 items col-12">
          <div className="col-12 m-2 ">
            <label className="w-50" htmlFor="typeOfProduct">Type Of Product</label>
            <input
             style={{border:"1px solid gray" }} className="w-50 btn" 
              type="text"
              name="typeOfProduct"
              id="typeOfProduct"
              placeholder="Enter Type Of Product"
              required
            /></div>
             <div className="col-12 m-2 ">
            <label className="w-50" htmlFor="color">Color</label>
            <input
             style={{border:"1px solid gray" }} className="w-50 btn" 
              type="text"
              name="color"
              id="color"
              placeholder="Enter Color"
              required
            /></div>
             <div className="col-12 m-2 ">
            <label className="w-50" htmlFor="type">Type</label>
            <input
             style={{border:"1px solid gray" }} className="w-50 btn" 
              type="text"
              name="type"
              id="type"
              placeholder="Enter Type"
              required
            /></div>
          </div>
          <div className="col-lg-6 items col-12">
          <div className="col-12 m-2 ">
            <label className="w-50" htmlFor="brandName">Brand Name</label>
            <input
             style={{border:"1px solid gray" }} className="w-50 btn" 
              type="text"
              name="brandName"
              id="brandName"
              placeholder="Enter Brand Name"
              required
            /></div>
             <div className="col-12 m-2 ">
            <label className="w-50" htmlFor="brandLogoSrc">Brand Logo Source</label>
            <input
             style={{border:"1px solid gray" }} className="w-50 btn" 
              type="text"
              name="brandLogoSrc"
              id="brandLogoSrc"
              placeholder="Enter Brand Logo Source"
              required
            /></div>
             <div className="col-12 m-2 ">
            <label className="w-50" htmlFor="descreption">Descreption</label>
            <input
             style={{border:"1px solid gray" }} className="w-50 btn" 
              type="text"
              name="descreption"
              id="descreption"
              placeholder="Enter Descreption"
              required
            /></div>
          </div>
          <button type="submit"  className="col-12 m-1 my-4 btn btn-secondary  ">Update Product</button>
          </div>
       
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
