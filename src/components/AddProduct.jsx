import React, { useState, useEffect } from "react";
import "./add_products.css";
import * as main_category from '../api/product_category'
import * as sub_category from '../api/subcategory'
import * as product from '../api/product'
import axios from "axios";

function AddProduct() {

  const integerValues = [1, 2, 3, 4, 5];
  const [images, setImages] = useState(Array(5).fill(""));
  const [image, setImage] = useState([])
  const [selectedValue, setSelectedValue] = useState(1);

  const [categories, setCategories] = useState([])
  const [selectedCategoryValue, setSelectedCategoryValue] = useState("");

  const [subCategories, setSubCategories] = useState([])
  const [selectedSubCategoryValue, setSelectedSubCategoryValue] = useState("");

  const typeOfProductValues = ["Hot sale", "Ai recom", "Super deals", "Viewed products", "First visit products", ""];
  const [selectedTypeValue, setSelectedTypeValue] = useState("Hot sale");

  const [brandLogo, setBrandLogo] = useState("")

  const [formData1, setFormData] = useState({
    supplier_id: "",
    name: "",
    quantity: 0,
    SKU: "",
    price_before: 0,
    price_after: 0,
    color: "",
    type: "",
    nameOfBrand: "",
    description: "",
    s: 0,
    m: 0,
    l: 0,
    xl: 0,
    xxl: 0
  });

  const handleSelectChange = (event) => {
    const value = parseInt(event.target.value);
    setSelectedValue(value);
  };

  const handleSelectCategory = (event) => {
    setSelectedCategoryValue(event.target.value);
    getSubCategory(event.target.value)
  };

  const handleSelectSuCategory = (event) => {
    setSelectedSubCategoryValue(event.target.value);
  };

  const handleSelectType = (event) => {
    setSelectedTypeValue(event.target.value);
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
      } else {
        setSelectedSubCategoryValue("")
      }
    })
  }

  const addProduct = async () => {
    const url = 'http://5.183.9.124:5000/product/upload';
    const formData = new FormData();
    for (let file of image) {
      formData.append('images', file);
    }
    formData.append('category_id', selectedCategoryValue);
    formData.append('subCategory', selectedSubCategoryValue);
    formData.append('typeOfProduct', selectedTypeValue);
    formData.append('name', formData1.name);
    formData.append('quantity', formData1.quantity);
    formData.append('SKU', formData1.SKU);
    formData.append('price_before', formData1.price_before);
    formData.append('price_after', formData1.price_after);
    formData.append('color', formData1.color)
    formData.append('type', formData1.type)
    formData.append('nameOfBrand', formData1.nameOfBrand)
    formData.append('description', formData1.description)
    formData.append('color', formData1.color)
    formData.append('s', formData1.s)
    formData.append('m', formData1.l)
    formData.append('l', formData1.l)
    formData.append('xl', formData1.xl)
    formData.append('xxl', formData1.xxl)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      window.location.reload(false);
    });
  }

  function handleChange(event) {
    setImage([...image, event.target.files[0]])
  }

  return (
    <div>
      <div className="add   ">
        <div className="w-100  addheder col-12" style={{ borderBottom: "1px solid gray", textAlign: "center" }} >
          <h1>Add Product</h1>
        </div>
        <div className=" col-12 h-75 my-5 ">
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
            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="description">
                Type of product
              </label>
              <select
                value={selectedTypeValue}
                style={{ width: "50%" }}
                onChange={handleSelectType}
              >
                {typeOfProductValues.map((typeOfProduct, index) => (
                  <option key={index} value={typeOfProduct} >
                    {typeOfProduct}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="name">
                Name
              </label>
              <input style={{ border: "1px solid gray" }}
                className="w-50 btn"
                type="text"
                name="name"
                value={formData1?.name}
                id="name"
                placeholder="Enter Name"
                onChange={(e) =>
                  setFormData({
                    ...formData1,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="quantity">
                Quantity
              </label>
              <input
                style={{ border: "1px solid gray" }} className="w-50 btn"
                type="number"
                name="quantity"
                value={formData1?.quantity}
                id="quantity"
                placeholder="Enter Quantity"
                onChange={(e) =>
                  setFormData({
                    ...formData1,
                    quantity: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="SKU">
                SKU
              </label>
              <input style={{ border: "1px solid gray" }}
                className="w-50 btn"
                type="text"
                value={formData1?.SKU}
                name="SKU"
                id="SKU"
                placeholder="Enter SKU"
                onChange={(e) =>
                  setFormData({
                    ...formData1,
                    SKU: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="priceBefore">
                Price Before
              </label>
              <input style={{ border: "1px solid gray" }}
                className="w-50 btn"
                type="number"
                value={formData1?.price_before}
                name="priceBefore"
                id="priceBefore"
                placeholder="Enter Price Before"
                onChange={(e) =>
                  setFormData({
                    ...formData1,
                    price_before: e.target.value,
                  })
                }
                required />
            </div>
            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="priceAfter">
                Price After
              </label>
              <input style={{ border: "1px solid gray" }}
                className="w-50 btn"
                type="number"
                value={formData1?.price_after}
                name="priceAfter"
                id="priceAfter"
                placeholder="Enter Price After"
                onChange={(e) =>
                  setFormData({
                    ...formData1,
                    price_after: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="color">
                Color
              </label>
              <input style={{ border: "1px solid gray" }}
                className="w-50 btn"
                type="text"
                value={formData1?.color}
                name="color"
                id="color"
                placeholder="Enter Color"
                onChange={(e) =>
                  setFormData({
                    ...formData1,
                    color: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="type">
                Type
              </label>
              <input style={{ border: "1px solid gray" }}
                className="w-50 btn"
                value={formData1?.type}
                type="text"
                name="type"
                id="type"
                placeholder="Enter Type"
                onChange={(e) =>
                  setFormData({
                    ...formData1,
                    type: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="brandName">
                Brand Name
              </label>
              <input style={{ border: "1px solid gray" }}
                className="w-50 btn"
                type="text"
                value={formData1?.nameOfBrand}
                name="brandName"
                id="brandName"
                placeholder="Enter Brand Name"
                onChange={(e) =>
                  setFormData({
                    ...formData1,
                    nameOfBrand: e.target.value,
                  })
                }
                required
              />
            </div>
            <div style={{ width: "100%" }}>
              <div className="col-12 m-2 ">
                <label className="w-50" htmlFor="brandLogoSrc">
                  Brand Logo Source
                </label>
                <input type="file" onChange={handleChange} />
              </div>
            </div>
            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="description">
                Description
              </label>
              <input style={{ border: "1px solid gray" }}
                className="w-50 btn"
                type="text"
                name="description"
                id="description"
                value={formData1?.description}
                placeholder="Enter description"
                onChange={(e) =>
                  setFormData({
                    ...formData1,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>
            <label className="w-50" htmlFor="sizes">
              Sizes
            </label>
            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="sizes">
                Quantity of s
              </label>
              <input style={{ border: "1px solid gray" }}
                className="w-50 btn"
                type="number"
                name="Quantity of s"
                value={formData1?.s}
                id="Quantity of s"
                placeholder="Enter Quantity of s"
                onChange={(e) =>
                  setFormData({
                    ...formData1,
                    s: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="sizes">
                Quantity of m
              </label>
              <input style={{ border: "1px solid gray" }}
                className="w-50 btn"
                type="number"
                name="Quantity of m"
                value={formData1?.m}
                id="Quantity of m"
                placeholder="Enter Quantity of m"
                onChange={(e) =>
                  setFormData({
                    ...formData1,
                    m: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="sizes">
                Quantity of l
              </label>
              <input style={{ border: "1px solid gray" }}
                className="w-50 btn"
                type="number"
                name="Quantity of l"
                value={formData1?.l}
                id="Quantity of l"
                placeholder="Enter Quantity of l"
                onChange={(e) =>
                  setFormData({
                    ...formData1,
                    l: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="sizes">
                Quantity of xl
              </label>
              <input style={{ border: "1px solid gray" }}
                className="w-50 btn"
                type="number"
                name="Quantity of xl"
                value={formData1?.xl}
                id="Quantity of xl"
                placeholder="Enter Quantity of xl"
                onChange={(e) =>
                  setFormData({
                    ...formData1,
                    xl: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="sizes">
                Quantity of xxl
              </label>
              <input style={{ border: "1px solid gray" }}
                className="w-50 btn"
                type="number"
                name="Quantity of xxl"
                value={formData1?.xxl}
                id="Quantity of xxl"
                placeholder="Enter Quantity of xxl"
                onChange={(e) =>
                  setFormData({
                    ...formData1,
                    xxl: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="description">
                Number of images
              </label>
              <select
                value={selectedValue}
                style={{ width: "50%" }}
                onChange={handleSelectChange}
              >
                {integerValues.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            {Array.isArray(images) &&
              images?.map((img, index) =>
              (
                <div key={index} style={{ width: "100%" }}>
                  <div className="col-12 m-2 ">
                    <label className="w-50" htmlFor="description">
                      Image {index + 1}
                    </label>
                    <input type="file" onChange={handleChange} />
                  </div>
                </div>
              )
              )}
            <button type="submit" className="col-12 m-1 my-4 btn btn-secondary  " onClick={() => { addProduct() }}>
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
