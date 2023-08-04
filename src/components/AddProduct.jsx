import React, { useState, useEffect } from "react";
import "./add_products.css";
import * as main_category from '../api/product_category'
import * as sub_category from '../api/subcategory'
import * as product from '../api/product'

function AddProduct() {

  const integerValues = [1, 2, 3, 4, 5];
  const [images, setImages] = useState(Array(5).fill(""));
  const [selectedValue, setSelectedValue] = useState(1);

  const [categories, setCategories] = useState([])
  const [selectedCategoryValue, setSelectedCategoryValue] = useState("");

  const [subCategories, setSubCategories] = useState([])
  const [selectedSubCategoryValue, setSelectedSubCategoryValue] = useState("");

  const typeOfProductValues = ["Hot sale", "Ai recom", "Super deals", "Viewed products", "First visit products", ""];
  const [selectedTypeValue, setSelectedTypeValue] = useState("Hot sale");

  const [brandLogo, setBrandLogo] = useState("")

  const [formData, setFormData] = useState({
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
    await product.add_product(
      "64c143a99cc379663282c26b",
      selectedCategoryValue,
      selectedSubCategoryValue,
      selectedTypeValue,
      formData.name,
      formData.quantity,
      formData.SKU,
      formData.price_before,
      formData.price_after,
      images.slice(0, selectedValue),
      formData.color,
      formData.type,
      formData.nameOfBrand,
      brandLogo,
      formData.description,
      formData.s,
      formData.m,
      formData.l,
      formData.xl,
      formData.xxl
    ).then(e => {
      window.location.reload(false);
    })
  }

  return (
    <div>
      <div className="add   ">
        <div className="w-100  addheder col-12" style={{ borderBottom: "1px solid gray", textAlign: "center" }} >
          <h1>Add Product</h1>
        </div>
        <form className=" col-12 h-75 my-5 ">
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
                value={formData?.name}
                id="name"
                placeholder="Enter Name"
                onChange={(e) =>
                  setFormData({
                    ...formData,
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
                value={formData?.quantity}
                id="quantity"
                placeholder="Enter Quantity"
                onChange={(e) =>
                  setFormData({
                    ...formData,
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
                value={formData?.SKU}
                name="SKU"
                id="SKU"
                placeholder="Enter SKU"
                onChange={(e) =>
                  setFormData({
                    ...formData,
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
                value={formData?.price_before}
                name="priceBefore"
                id="priceBefore"
                placeholder="Enter Price Before"
                onChange={(e) =>
                  setFormData({
                    ...formData,
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
                value={formData?.price_after}
                name="priceAfter"
                id="priceAfter"
                placeholder="Enter Price After"
                onChange={(e) =>
                  setFormData({
                    ...formData,
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
                value={formData?.color}
                name="color"
                id="color"
                placeholder="Enter Color"
                onChange={(e) =>
                  setFormData({
                    ...formData,
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
                value={formData?.type}
                type="text"
                name="type"
                id="type"
                placeholder="Enter Type"
                onChange={(e) =>
                  setFormData({
                    ...formData,
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
                value={formData?.nameOfBrand}
                name="brandName"
                id="brandName"
                placeholder="Enter Brand Name"
                onChange={(e) =>
                  setFormData({
                    ...formData,
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
                <input style={{ border: "1px solid gray" }}
                  className="w-50 btn"
                  type="text"
                  name="brandLogoSrc"
                  value={brandLogo}
                  id="brandLogoSrc"
                  placeholder="Enter Brand Logo Source"
                  onChange={(e) => setBrandLogo(e.target.value)}
                  required
                />
              </div>
              <img
                style={{ width: "50%" }}
                src={brandLogo}
                className="my-3 mx-3"
                alt={"Please enter link of image"}
              />
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
                placeholder="Enter description"
                onChange={(e) =>
                  setFormData({
                    ...formData,
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
                value={formData?.s}
                id="Quantity of s"
                placeholder="Enter Quantity of s"
                onChange={(e) =>
                  setFormData({
                    ...formData,
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
                value={formData?.m}
                id="Quantity of m"
                placeholder="Enter Quantity of m"
                onChange={(e) =>
                  setFormData({
                    ...formData,
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
                value={formData?.l}
                id="Quantity of l"
                placeholder="Enter Quantity of l"
                onChange={(e) =>
                  setFormData({
                    ...formData,
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
                value={formData?.xl}
                id="Quantity of xl"
                placeholder="Enter Quantity of xl"
                onChange={(e) =>
                  setFormData({
                    ...formData,
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
                value={formData?.xxl}
                id="Quantity of xxl"
                placeholder="Enter Quantity of xxl"
                onChange={(e) =>
                  setFormData({
                    ...formData,
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
                index < selectedValue ? (
                  <div key={index} style={{ width: "100%" }}>
                    <div className="col-12 m-2 ">
                      <label className="w-50" htmlFor="description">
                        Image {index + 1}
                      </label>
                      <input style={{ border: "1px solid gray" }}
                        className="w-50 btn"
                        type="text"
                        name={`Image ${index + 1}`}
                        id={`Image ${index + 1}`}
                        placeholder={`Image ${index + 1}`}
                        value={img}
                        onChange={(e) =>
                          setImages((prevImages) => {
                            const updatedImages = [...prevImages];
                            updatedImages[index] = e.target.value;
                            return updatedImages;
                          })
                        }
                        required
                      />
                    </div>
                    <img
                      style={{ width: "50%" }}
                      className="my-3 mx-3"
                      src={img}
                      alt={"Please enter link of image"}
                    />
                  </div>
                ) : (
                  <div key={index}></div>
                )
              )}
            <button type="submit" className="col-12 m-1 my-4 btn btn-secondary  " onClick={() => { addProduct() }}>
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
