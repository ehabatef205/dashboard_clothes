import React, { useState, useEffect } from "react";
import "./add_products.css";
import * as main_category from '../api/product_category'
import * as sub_category from '../api/subcategory'
import * as product from '../api/product'
import { AiOutlineEdit } from 'react-icons/ai';
import { AiOutlineDown } from 'react-icons/ai'
import { AiOutlineUp } from 'react-icons/ai'
import ViewSubCategoryUpdate from "./ViewProductUpdate";

function UpdateProduct() {

  const [categories, setCategories] = useState([])
  const [selectedCategoryValue, setSelectedCategoryValue] = useState("");

  const [subCategories, setSubCategories] = useState([])
  const [selectedSubCategoryValue, setSelectedSubCategoryValue] = useState("");

  const [products, setProducts] = useState([])

  const [open, setOpen] = useState(false)

  const handleSelectCategory = (event) => {
    setSelectedCategoryValue(event.target.value);
    getSubCategory(event.target.value)
  };

  const handleSelectSuCategory = (event) => {
    setSelectedSubCategoryValue(event.target.value);
    getProducts(event.target.value)
  };

  useEffect(() => {
    const getCategory = async () => {
      await main_category.all_product_category().then(e => {
        setCategories(e.response)
        setSelectedCategoryValue(e.response[0]._id)
        getSubCategory(e.response[0]._id)
      })
    }
    getCategory()
  }, [])

  const getSubCategory = async (id) => {
    await sub_category.all_sub_category(id).then(e => {
      setSubCategories(e.response)
      if (e.response.length !== 0) {
        setSelectedSubCategoryValue(e.response[0]._id)
        getProducts(e.response[0]._id)
      } else {
        setProducts([])
      }
    })
  }

  const getProducts = async (id) => {
    await product.get_product_by_category(id).then(e => {
      setProducts(e.response)
      console.log(e.response)
    })
  }

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div>
      <div className="add">
        <div
          className="w-100  addheder col-12"
          style={{ borderBottom: "1px solid gray", textAlign: "center" }}
        >
          <h1>Update Product</h1>
        </div>
        <form className=" col-12 h-75 my-5 " onSubmit={(e)=>{e.preventDefault()}}>
          <div
            className="d-flex flex-wrap "
          >
            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="description">
                Category <b className="text-danger" style={{fontSize:"1.3rem"}}>*</b>
              </label>
              <select
                value={selectedCategoryValue}
                style={{ width: "50%" }}
                onChange={handleSelectCategory}
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id} >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="description">
                Sub category <b className="text-danger" style={{fontSize:"1.3rem"}}>*</b>
              </label>
              <select
                value={selectedSubCategoryValue}
                style={{ width: "50%" }}
                onChange={handleSelectSuCategory}
              >
                {subCategories.map((subCategory) => (
                  <option key={subCategory._id} value={subCategory._id} >
                    {subCategory.name}
                  </option>
                ))}
              </select>
            </div>
            {products.map((product1, index) => (
              <ViewSubCategoryUpdate key={index} product={product1} />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;

const nameStyle = {
  padding: "10px",
  width: "100%",
  flexDirection: "row",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #000"
}
