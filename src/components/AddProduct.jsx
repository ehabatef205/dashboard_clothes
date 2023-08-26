import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { SketchPicker } from "react-color";
import "./add_products.css";
import * as main_category from "../api/product_category";
import * as sub_category from "../api/subcategory";

import axios from "axios";


function AddProduct() {
  const [clothing, setclothing] = useState(false);
  const [size, setsize] = useState(false);
  const [color, setcolor] = useState(false);
  const [sizecolorstate, setsizecolorstate] = useState("");
  const [creatingnew, setcreatingnew] = useState(false);
  const addcoloraction = () => {
    setcreatingnew(!creatingnew);
    console.log(creatingnew);
  };
  const [sucessview, setsucessview] = useState("");
  const options = [true, false];
  const sizeable = [true, false];
  const colors = [true, false];
  const handleOptionChange = (event) => {
    setclothing(event.target.value);
    console.log(clothing);
  };
  const handleSizeableChange = (event) => {
    setsize(event.target.value === "true");
    console.log(clothing);
  };
  const handleColorsChange = (event) => {
    setcolor(event.target.value === "true");
    console.log(clothing);
  };
  const [newMainKey, setNewMainKey] = useState("");
  const [newNestedKey, setNewNestedKey] = useState("");
  const [newNestedValue, setNewNestedValue] = useState(0);

  const handleMainKeyChange = (event) => {
    setNewMainKey(event.target.value);
  };

  const handleNestedKeyChange = (event) => {
    setNewNestedKey(event.target.value);
  };

  const handleNestedValueChange = (event) => {
    setNewNestedValue(event.target.value);
  };

  const handleAddNestedField = () => {
    if (newMainKey && newNestedKey && newNestedValue) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [newMainKey]: {
          ...(prevQuantities[newMainKey] || {}),
          [newNestedKey]: parseInt(newNestedValue),
        },
      }));
      setNewNestedKey("");
      setNewNestedValue(0);
    }
  };
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState(0);

  const handleKeyChange = (event) => {
    setNewKey(event.target.value);
  };

  const handleValueChange = (event) => {
    setNewValue(event.target.value);
  };

  const handleAddField = () => {
    if (newKey && newValue) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [newKey]: parseInt(newValue),
      }));
      setNewKey("");
      setNewValue(0);
    }
  };
  const handleAddFieldcolor = () => {
    if (newKey && newValue) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [newKey]: parseInt(newValue),
      }));
      setNewKey("");
      setNewValue(0);
    }
  };
  const [images, setImages] = useState(Array(5).fill(""));
  const [image, setImage] = useState([]);
  const [selectedValue, setSelectedValue] = useState(1);
  const [Quantities, setQuantities] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategoryValue, setSelectedCategoryValue] = useState("");

  const [gender, setgender] = useState("female");
  const genderarr = ["female", "male"];
  const vrposarr = ["tops", "bottoms", "outerwear", "allbody"];
  const vrpossecarr = ["pants", "shorts", "skirts"];
  const [vrpos, setVRPOS] = useState("tops");
  const [sec, setVRPOSsec] = useState("pants");

  const sentsuccess = () => {
    setsizecolorstate("")
    setsizecolorselected(false)
    setQuantities({})
    setSelectedValue(1);
    setsize(false);
    setcolor(false);
    setclothing(false);
    setFormData({
      supplier_id: "",
      name: "",
      quantity: 0,
      SKU: "",
      price_before: 0,
      price_after: 0,

      nameOfBrand: "",
      description: "",
    });
    setImages(Array(5).fill(""));
    setImage([]);
    window.scrollTo(0, 0);
  };

  const [clength, setclength] = useState(6);
  const [subCategories, setSubCategories] = useState([]);

  const [selectedSubCategoryValue, setSelectedSubCategoryValue] = useState("");


  const [formData1, setFormData] = useState({
    supplier_id: "",
    name: "",
    quantity: 0,
    SKU: "",
    price_before: 0,
    price_after: 0,

    nameOfBrand: "",
    description: "",
  });
  const handleSelectCategory = (event) => {
    setSelectedCategoryValue(event.target.value);
    getSubCategory(event.target.value);
  };

  const handleSelectSuCategory = (event) => {
    setSelectedSubCategoryValue(event.target.value);
  };

  useEffect(() => {
    const getCategory = async () => {
      await main_category.all_product_category().then((e) => {
        setCategories(e.response);
        setSelectedCategoryValue(e.response[0]._id);
        getSubCategory(e.response[0]._id);
      });
    };
    getCategory();
  }, []);


  const getSubCategory = async (id) => {
    await sub_category.all_sub_category(id).then((e) => {
      setSubCategories(e.response);
      if (e.response.length !== 0) {
        setSelectedSubCategoryValue(e.response[0]._id);
      } else {
        setSelectedSubCategoryValue("");
      }
    });
  };

  const addProduct = async (e) => {
    e.preventDefault()
    const url = "https://fair-gold-moose-wig.cyclic.cloud/product/upload";
    const formData = new FormData();
    console.log(true,sizeable,colors)
    for (let file of image) {
      formData.append("images", file);
    }
    formData.append("category_id", selectedCategoryValue);
    formData.append("subCategory", selectedSubCategoryValue);
    formData.append("typeOfProduct", "");
    formData.append("name", formData1.name);

    formData.append("SKU", formData1.SKU);
    formData.append("price_before", formData1.price_before);
    formData.append("price_after", formData1.price_after);
    formData.append("type", formData1.type);
    formData.append("nameOfBrand", formData1.nameOfBrand);
    formData.append("description", JSON.stringify(formData1.description));
    formData.append("dressing", clothing === "true");
    if (clothing === "true") {
      formData.append("gender", gender);
      formData.append("vrpos", vrpos);
      if (vrpos === "bottoms") {
        formData.append("vrpossec", sec);
      }
    }
    formData.append("quantity",JSON.stringify(Quantities))
    formData.append("colors",color)
    formData.append("sizeable",size)
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      if (response.data.response.name) {
        if (response.data.response.garment_id) {
          setsucessview("product added with dressing room option");
        } else {
          setsucessview("product added successfully");
        }

        sentsuccess();
      } else {
        setsucessview("Operation failed , some error occurred");
      }
    });
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function handleChange(event) {
    setImage([...image, event.target.files[0]]);
  }
  const [sizecolorselected, setsizecolorselected] = useState(false);
  const sizecoloraction = () => {
    if (size) {
      if (color) {
        setsizecolorstate("sizecolor");
      } else {
        setsizecolorstate("size");
      }
    } else {
      if (color) {
        setsizecolorstate("color");
      } else {
        setsizecolorstate("none");
      }
    }

    setsizecolorselected(true);
  };

  const Clothingtrue = () => {
    if (clothing)
      return (
        <>
          {/*   */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <label className="w-50" htmlFor="sizes">
              gender
            </label>
            <select
              style={{ width: "50%" }}
              value={gender}
              onChange={(e) => setgender(e.target.value)}
            >
              {genderarr.map((option, index) => (
                <option key={index} value={option}>
                  {String(option)}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <label className="w-50" htmlFor="sizes">
              VR position
            </label>
            <select
              style={{ width: "50%" }}
              value={vrpos}
              onChange={(e) => setVRPOS(e.target.value)}
            >
              {vrposarr.map((option, index) => (
                <option key={index} value={option}>
                  {String(option)}
                </option>
              ))}
            </select>
          </div>
          {vrpos === "bottoms" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <label className="w-50" htmlFor="sizes">
                VR possition bottom
              </label>
              <select
                style={{ width: "50%" }}
                value={sec}
                onChange={(e) => setVRPOSsec(e.target.value)}
              >
                {vrpossecarr.map((option, index) => (
                  <option key={index} value={option}>
                    {String(option)}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <></>
          )}
        </>
      );
    else {
      return <></>;
    }
  };
  return (
    <div>
      <div className="add   ">
        <div
          className="w-100  addheder col-12"
          style={{ borderBottom: "1px solid gray", textAlign: "center" }}
        >
          <h1>Add Product</h1>
          <h3 className="text-danger">{sucessview}</h3>
        </div>
        <form className="w-100" onSubmit={addProduct}   >
        <div className=" col-12 h-75 my-5 w-100">
          <div className="d-flex flex-wrap ">
            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="description">
                Category{" "}
                <b className="text-danger" style={{ fontSize: "1.3rem" }}>
                  *
                </b>
              </label>
              <select
                value={selectedCategoryValue}
                style={{ width: "50%" }}
                onChange={handleSelectCategory}
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="description">
                Sub category{" "}
                <b className="text-danger" style={{ fontSize: "1.3rem" }}>
                  *
                </b>
              </label>
              <select
                value={selectedSubCategoryValue}
                style={{ width: "50%" }}
                onChange={handleSelectSuCategory}
              >
                {subCategories.map((subCategory) => (
                  <option key={subCategory._id} value={subCategory._id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="name">
                Name{" "}
                <b className="text-danger" style={{ fontSize: "1.3rem" }}>
                  *
                </b>
              </label>
              <input
                style={{ border: "1px solid gray" }}
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
              <label className="w-50" htmlFor="SKU">
                SKU{" "}
                <b className="text-danger" style={{ fontSize: "1.3rem" }}>
                  *
                </b>
              </label>
              <input
                style={{ border: "1px solid gray" }}
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
                Price Before{" "}
                <b className="text-danger" style={{ fontSize: "1.3rem" }}>
                  *
                </b>
              </label>
              <input
                style={{ border: "1px solid gray" }}
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
                required
              />
            </div>
            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="priceAfter">
                Price After{" "}
                <b className="text-danger" style={{ fontSize: "1.3rem" }}>
                  *
                </b>
              </label>
              <input
                style={{ border: "1px solid gray" }}
                className="w-50 btn"
                type="number"
                value={formData1?.price_after}
                name="priceAfter"
                id="priceAfter"
                placeholder="Enter Price After"
                onChange={(e) =>{
                  if(parseInt(e.target.value) <= parseInt(formData1?.price_before)){
                    setFormData({
                      ...formData1,
                      price_after: e.target.value,
                    })
                  }
                }
                }
                required
              />
            </div>

            <div className="col-12 m-2 ">
              <label className="w-50" htmlFor="brandName">
                Brand Name
                <b className="text-danger" style={{ fontSize: "1.3rem" }}>
                  *
                </b>
              </label>
              <input
                style={{ border: "1px solid gray" }}
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
              <label
                className="w-50 "
                htmlFor="description"
                style={{ position: "relative", bottom: "180px" }}
              >
                Description
              </label>
              <textarea
                style={{ border: "1px solid gray", height: "200px" }}
                className="w-50"
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
            <div
              style={{
                width: "100%",
                border: "1px solid gray",
                borderRadius: "20px",
              }}
            >
              {sizecolorselected ? (
                <>
                  {sizecolorstate === "none" && (
                    <div className="col-12 m-2 ">
                      <label style={{ width: "50%" }} htmlFor="quantity">
                        quantity{" "}
                        <b
                          className="text-danger"
                          style={{ fontSize: "1.3rem" }}
                        >
                          *
                        </b>
                      </label>
                      <input
                        style={{ border: "1px solid gray", width: "45%" }}
                        type="number"
                        value={Quantities?.avilable}
                        
                        placeholder="Enter avilable amount"
                        onChange={(e) =>
                          setQuantities({avilable:parseInt(e.target.value)})
                        }
                        required
                      />
                    </div>
                  )}

                  {sizecolorstate === "size" && (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter size"
                        value={newKey}
                        onChange={handleKeyChange}
                      />
                      <input
                        type="number"
                        placeholder="Enter value"
                        value={newValue}
                        onChange={handleValueChange}
                      />
                      <button type="button"  onClick={handleAddField}>Add Field</button>

                      <div>
                        <pre>{JSON.stringify(Quantities, null, 2)}</pre>
                      </div>
                    </div>
                  )}
                  {sizecolorstate === "color" && (
                    <div>
                      {/* <input
                        type="text"
                        placeholder="Enter color hex"
                        value={newKey}
                        onChange={handleKeyChange}
                      /> */}
                      {/* <input
                        type="number"
                        placeholder="Enter number of items"
                        value={newValue}
                        onChange={handleValueChange}
                      /> */}
{/*                       <button onClick={handleAddFieldcolor}>Add Field</button>
 */}
                     {/*  <div>
                        <pre>{JSON.stringify(Quantities, null, 2)}</pre>
                      </div> */}
                    </div>
                  )}
                  {sizecolorstate === "sizecolor" && (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter size"
                        value={newMainKey}
                        onChange={handleMainKeyChange}
                      />
                      <input
                        type="text"
                        placeholder="Enter color hex"
                        value={newNestedKey}
                        onChange={handleNestedKeyChange}
                      />
                      <input
                        type="number"
                        placeholder="Enter quantity"
                        value={newNestedValue}
                        onChange={handleNestedValueChange}
                      />
                      <button  type="button" onClick={handleAddNestedField}>
                        Add Nested Field
                      </button>
                      <Picker></Picker>
                      <div>
                        <h2>Quantities Object</h2>
                        <pre>{JSON.stringify(Quantities, null, 2)}</pre>
                      </div>
                    </div>
                  )}
                  {sizecolorstate === "color" && (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter color hex"
                        value={newKey}
                        onChange={handleKeyChange}
                      />
                      <input
                        type="number"
                        placeholder="Enter number of items"
                        value={newValue}
                        onChange={handleValueChange}
                      />
                      <button onClick={handleAddFieldcolor} type="button" >Add Field</button>
                      <Picker></Picker>
                      <div>
                        <pre>{JSON.stringify(Quantities, null, 2)}</pre>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <span className="w-50">
                      {" "}
                      Size avilable?{" "}
                      <b className="text-danger" style={{ fontSize: "1.3rem" }}>
                        *
                      </b>
                    </span>
                    <select
                      style={{ width: "50%" }}
                      value={String(size)}
                      onChange={handleSizeableChange}
                    >
                      {sizeable.map((option, index) => (
                        <option key={index} value={option}>
                          {String(option)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <span className="w-50">
                      {" "}
                      colors avilable?{" "}
                      <b className="text-danger" style={{ fontSize: "1.3rem" }}>
                        *
                      </b>
                    </span>
                    <select
                      style={{ width: "50%" }}
                      value={String(color)}
                      onChange={handleColorsChange}
                    >
                      {colors.map((option, index) => (
                        <option key={index} value={option}>
                          {String(option)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="button" 
                    style={{ width: "100%" }}
                    onClick={() => {
                      sizecoloraction();
                    }}
                  >
                    Apply size - color status
                  </button>
                </>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <span className="w-50">
                {" "}
                Dressing room avilable?{" "}
                <b className="text-danger" style={{ fontSize: "1.3rem" }}>
                  *
                </b>
              </span>
              <select
                style={{ width: "50%" }}
                value={clothing}
                onChange={handleOptionChange}
              >
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {String(option)}
                  </option>
                ))}
              </select>
            </div>

            {clothing === "true" ? <Clothingtrue /> : <></>}

            {Array.isArray(images) &&
              images?.map((img, index) => (
                <div key={index} style={{ width: "100%" }}>
                  <div className="col-12 m-2 ">
                    <label className="w-50" htmlFor="description">
                      Image {index + 1}
                    </label>
                    <input type="file" onChange={handleChange} />
                  </div>
                </div>
              ))}
            <button
              className="col-12 m-1 my-4 btn btn-secondary  "
              type="submit"
            >
              Add Product
            </button>
          </div>
        </div></form>

      </div>
    </div>
  );
}

const Picker = () => {
  const [sketchPickerColor, setSketchPickerColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });
  const { r, g, b, a } = sketchPickerColor;
  return (
    <div className="sketchpicker">
      <h6>Sketch Picker</h6>
      {/* Div to display the color  */}
      <div
        style={{
          backgroundColor: `rgba(${r},${g},${b},${a})`,
          width: 50,
          height: 50,
          border: "2px solid white",
          marginBottom: "0px"
        }}
      ></div>
      <SketchPicker 
        onChange={(color) => {
          setSketchPickerColor(color.rgb);
        }}
        color={sketchPickerColor}
      />
    </div>
  );
};

export default AddProduct;
