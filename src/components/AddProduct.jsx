import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import "./add_products.css";
import * as main_category from '../api/product_category'
import * as sub_category from '../api/subcategory'

import axios from "axios";


function AddProduct() {
  const [creatingnew, setcreatingnew] = useState(false)
  const addcoloraction=()=>{
    setcreatingnew(!creatingnew)
    console.log(creatingnew)
  }
  const options=[true, false]
  const handleOptionChange = (event) => {
    console.log(event.target.value)
    setclothing(event.target.value);

};
  const [colorhex, setcolorhex] = useState("");

  const integerValues = [1, 2, 3, 4, 5];
  const [images, setImages] = useState(Array(5).fill(""));
  const [image, setImage] = useState([])
  const [selectedValue, setSelectedValue] = useState(1);

  const [categories, setCategories] = useState([])
  const [selectedCategoryValue, setSelectedCategoryValue] = useState("");
  const  [Colors, setColors] = useState(["red","blue","orange","black","white","green"])
  const [sizeQuantities, setSizeQuantities] = useState({
    S: [0, 0, 0, 0, 0, 0],
    M: [0, 0, 0, 0, 0, 0],
    L: [0, 0, 0, 0, 0, 0],
    XL: [0, 0, 0, 0, 0, 0],
    XXL: [0, 0, 0, 0, 0, 0],
  });

  const addcolor=()=>{
    console.log(colorhex)
    if(colorhex.length===6)
    {
    var  initialColors = [...Colors];
     initialColors.push(`#${colorhex}`)
     console.log(initialColors)
    const initialSizeQuantities = {
      S: Array(initialColors.length).fill(0),
      M: Array(initialColors.length).fill(0),
      L: Array(initialColors.length).fill(0),
      XL: Array(initialColors.length).fill(0),
      XXL: Array(initialColors.length).fill(0),
    };
    setColors(initialColors)
    setSizeQuantities(initialSizeQuantities)
    setcreatingnew(false)}
  }
  const  [clength, setclength] = useState(6)
  const [subCategories, setSubCategories] = useState([])
  const [clothing, setclothing] = useState(false)
  const [selectedSubCategoryValue, setSelectedSubCategoryValue] = useState("");


  const [brandLogo, setBrandLogo] = useState("")

  const [formData1, setFormData] = useState({
    supplier_id: "",
    name: "",
    quantity:0,
    SKU: "",
    price_before: 0,
    price_after: 0,
    type: "",
    nameOfBrand: "",
    description: "",

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
  useEffect(() => {
    setclength(Colors.length)
  }, [Colors])

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


  const updateSizeQuantity = (size, index, newValue) => {

    
    setSizeQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      updatedQuantities[size][index] = newValue;
      return updatedQuantities;
    });
  };

  const addProduct = async () => {
    const url = 'http://5.183.9.124:5000/product/upload';
    const formData = new FormData();
    for (let file of image) {
      formData.append('images', file);
    }
    formData.append('category_id', selectedCategoryValue);
    formData.append('subCategory', selectedSubCategoryValue);
    formData.append('typeOfProduct', '');
    formData.append('name', formData1.name);

    formData.append('SKU', formData1.SKU);
    formData.append('price_before', formData1.price_before);
    formData.append('price_after', formData1.price_after);
    formData.append('quantity', formData1.quantity);
    formData.append('type', formData1.type)
    formData.append('nameOfBrand', formData1.nameOfBrand)
    formData.append('description',JSON.stringify( formData1.description))
    formData.append('clothing', clothing)
    formData.append('colors', JSON.stringify(Colors))
    formData.append('sizes', JSON.stringify(sizeQuantities))

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response)
    });
  }

  function handleChange(event) {
    setImage([...image, event.target.files[0]])
  }
  const Clothingtrue=()=>{if(clothing)return(<><div style={{display:"flex",flexDirection:"row",width:"100%" }}>
  <div style={{width:"50%"}}>
  <label >
    Colors
  </label>
  <button disabled={!clothing} onClick={addcoloraction}>start adding more </button>

  {creatingnew?(<div>
    <input type="text" value={colorhex}style={{width:"100%"}} onChange={(e)=>{setcolorhex(e.target.value)}} placeholder="copy color hex here"></input>
    <button disabled={!clothing} onClick={addcolor}>+ add  </button>
    <Picker></Picker>
    
  </div>):<></>}</div>
  <div style={{ border: "1px solid gray",display:"flex",flexDirection:"row",justifyContent:"space-between",width:"50%" }} 
  >{Colors.map((color,index)=>(
    <button disabled={!clothing} style={{color:color,backgroundColor:color,borderRadius:"20px",width:`${100/clength}%`}}> 0</button>
  ))}</div>
</div>

<label className="w-50" htmlFor="sizes">
  Sizes
</label>
<div style={{display:"flex",flexDirection:"row",width:"100%" }}>
  <label className="w-50" htmlFor="sizes">
    Quantity of s
  </label>
  <div style={{ border: "1px solid gray",display:"flex",flexDirection:"row",justifyContent:"space-between",width:"50%" }} 
  >{Colors.map((color,index)=>(
    <input  key={index} disabled={!clothing}
    type="number"
    value={sizeQuantities.S[index]}
    style={{  borderRadius: "5px", width: `${100 / clength}%` }}
    onChange={(e) => updateSizeQuantity("S", index, e.target.value)}
    />
  ))}</div>
</div>
<div style={{display:"flex",flexDirection:"row",width:"100%" }}>
  <label className="w-50" htmlFor="sizes">
    Quantity of m
  </label>
  <div style={{ border: "1px solid gray",display:"flex",flexDirection:"row",justifyContent:"space-between",width:"50%" }} 
  >{Colors.map((color,index)=>(
    <input  key={index} disabled={!clothing}
    type="number"
    value={sizeQuantities.M[index]}
    style={{  borderRadius: "5px", width: `${100 / clength}%` }}
    onChange={(e) => updateSizeQuantity("M", index, e.target.value)}
    />
  ))}</div>
</div>
<div style={{display:"flex",flexDirection:"row",width:"100%" }}>
  <label className="w-50" htmlFor="sizes">
    Quantity of l
  </label>
  <div style={{ border: "1px solid gray",display:"flex",flexDirection:"row",justifyContent:"space-between",width:"50%" }} 
  >{Colors.map((color,index)=>(
    <input  key={index} disabled={!clothing}
    type="number"
    value={sizeQuantities.L[index]}
    style={{  borderRadius: "5px", width: `${100 / clength}%` }}
    onChange={(e) => updateSizeQuantity("L", index, e.target.value)}
    />
  ))}</div>
</div>
<div style={{display:"flex",flexDirection:"row",width:"100%" }}>
  <label className="w-50" htmlFor="sizes">
    Quantity of xl
  </label>
  <div style={{ border: "1px solid gray",display:"flex",flexDirection:"row",justifyContent:"space-between",width:"50%" }} 
  >{Colors.map((color,index)=>(
    <input key={index}  disabled={!clothing}
    type="number"
    value={sizeQuantities.XL[index]}
    style={{  borderRadius: "5px", width: `${100 / clength}%` }}
    onChange={(e) => updateSizeQuantity("XL", index, e.target.value)}
    />
  ))}</div>
</div>
<div style={{display:"flex",flexDirection:"row",width:"100%" }}>
  <label className="w-50" htmlFor="sizes">
    Quantity of xxl
  </label>
  <div style={{ border: "1px solid gray",display:"flex",flexDirection:"row",justifyContent:"space-between",width:"50%" }} 
  >{Colors.map((color,index)=>(
    <input  key={index} disabled={!clothing}
    type="number"
    value={sizeQuantities.XXL[index]}
    style={{  borderRadius: "5px", width: `${100 / clength}%` }}
    onChange={(e) => updateSizeQuantity("XXL", index, e.target.value)}
    />
  ))}</div>
</div></>)
else{return<></>}
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
              <label className="w-50 " htmlFor="description" style={{position:"relative",bottom:"180px"}}>
                Description
              </label>
              <textarea style={{ border: "1px solid gray" ,height:"200px"}}
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
            <div style={{display:"flex",flexDirection:"row",width:"100%" }}>
              clothing?
            <select style={{width:"50%"}} value={clothing} onChange={handleOptionChange}>
                        {options.map((option, index) => (
                        <option key={index} value={option}>
                    {String(option)}
                </option>
                ))}
                        </select></div>
            
            {clothing ?<Clothingtrue/>:
            
            <div className="col-12 m-2 " >
              <label className="w-50" htmlFor="quantity">
                quantity
              </label>
              <input style={{ border: "1px solid gray" }}
                className="w-50 btn"
                type="number"
                value={formData1?.quantity}
                name="priceBefore"
                id="priceBefore"
                placeholder="Enter Price Before"
                onChange={(e) =>
                  setFormData({
                    ...formData1,
                    quantity: e.target.value,
                  })
                }
                required />
            </div>}
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
            <button  className="col-12 m-1 my-4 btn btn-secondary  " onClick={() => { addProduct() }}>
              Add Product
            </button>
          </div>
        </div>
        
      
      </div>
    </div>
  );
}

const Picker=()=>{
  const [sketchPickerColor, setSketchPickerColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });
  const { r, g, b, a } = sketchPickerColor;
  return(
    <div className="sketchpicker">
        <h6>Sketch Picker</h6>
        {/* Div to display the color  */}
        <div
          style={{
            backgroundColor: `rgba(${r},${g},${b},${a})`,
            width: 50,
            height: 50,
            border: "2px solid white",
          }}
        ></div>
        <SketchPicker
          onChange={(color) => {
            setSketchPickerColor(color.rgb);
          }}
          color={sketchPickerColor}
        />
      </div>
  )
}



export default AddProduct;


