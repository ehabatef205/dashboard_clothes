import React, { useEffect, useState } from 'react'
import "./delete.css"
import * as main_category from '../api/product_category'
import * as sub_category from '../api/subcategory'
import * as product from '../api/product'
import { AiOutlineDelete } from 'react-icons/ai';

function DeleteProduct() {

  const [categories, setCategories] = useState([])
  const [selectedCategoryValue, setSelectedCategoryValue] = useState("");

  const [subCategories, setSubCategories] = useState([])
  const [selectedSubCategoryValue, setSelectedSubCategoryValue] = useState("");

  const [products, setProducts] = useState([])

  const handleSelectCategory = (event) => {
    setSelectedCategoryValue(event.target.value);
    getSubCategory(event.target.value)
  };

  const handleSelectSuCategory = (event) => {
    setSelectedSubCategoryValue(event.target.value);
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

  const deleteProduct = async (id) => {
    await product.delete_product(id).then(res => {
      setProducts((current) =>
        current.filter((fruit) => fruit._id !== id)
      );
    })
  }

  return (
    <div>
      <div className='delete bg-light mx-5 '>
        <h1 className='col-12 ' style={{ borderBottom: "1px solid gray", textAlign: "center" }} >Delete Product</h1>

        <form className='col-12  m-2'>
          <div
            className="d-flex flex-wrap "
          >
            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="description">
                Category
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
                Sub category
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
            <table>
              <thead>
                <tr>
                  <th>index</th>
                  <th>Name</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product1, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product1.name}</td>
                    <td><AiOutlineDelete style={{ fontSize: "25px", cursor: "pointer" }} onClick={() => { deleteProduct(product1._id) }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div></div>
  )
}

export default DeleteProduct