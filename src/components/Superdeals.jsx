import React, { useEffect, useState } from "react";
import * as product from "../api/product";
import * as superdealsapi from "../api/superdeals";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./deals.css";
import "./delete.css";

export function SearchBar({ query, setquery, search }) {
  return (
    <div className="search-input-container  d-flex justify-content-center">
      <input
        type="text"
        className="search-input"
        placeholder="Search Products"
        value={query}
        onChange={(e) => {
          setquery(e.target.value);
        }}
      />
      <i
        className="bi bi-search my-2 search-icon "
        role="button"
        onClick={search}
      ></i>
    </div>
  );
}

export default function Superdeals() {
  const [products, setProducts] = useState([]);
  const [selectedproducts, setselectedProducts] = useState([]);
  const [query, setquery] = useState("");
  const getProducts = async () => {
    await product.all_product().then((e) => {
      setProducts(e.response);
    });
  };
  useEffect(() => {
    getProducts();
  }, []);
  const search = () => {
    if (query === "") getProducts();
    else {
      product.searchpage(query).then((e) => {
        setProducts(e.response);
      });
    }
  };
  const changeselection = (product) => {
    const current = [...selectedproducts]; // Correct way to copy the array
    const index = current.indexOf(product);

    if (index !== -1) {
      current.splice(index, 1); // Remove the element at the found index
    } else {
      current.push(product);
    }

    setselectedProducts(current);
    console.log(current);
  };

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showproducts, setshowproducts] = useState(false);
  const [showaddition, setshowaddition] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [Name, setName] = useState("");
  const [price, setprice] = useState(0);
  const [quantity, setquantity] = useState(0);
  const [isValidFormat, setIsValidFormat] = useState(true);

  const handleDateChange = (event) => {
    const inputDate = event.target.value;

    if (/^(0[1-9]|1[0-2])\/([0-2][0-9]|3[0-1])$/.test(inputDate)) {
      setSelectedDate(inputDate);
      setIsValidFormat(true);
    } else {
      setSelectedDate(inputDate);
      setIsValidFormat(false);
    }
  };

  const viewproducts = () => {
    setshowproducts(true);
    setshowaddition(false);
  };
  const viewselected = () => {
    setShowConfirmation(true);
  };

   const confirmadding = async () => {
    if(isValidFormat){
      const [month, day] = selectedDate.split('/').map(Number);
       const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
       const nextDate = new Date(currentYear, month - 1, day);
       if (nextDate < currentDate) {
        nextDate.setFullYear(currentYear + 1);
      if(Name!==""&&(price)>0&&quantity>0&&selectedproducts.length>0){
        await superdealsapi.create(Name,selectedproducts,nextDate,price,quantity).then((e)=>{
          toast.success("Done ", {
            position: toast.POSITION.TOP_RIGHT
          })
        setShowConfirmation(false);
        })
      }
      
      else{
        console.log(Name,selectedproducts,nextDate,price,quantity)
        toast.error("please fill the feilds properly ", {
        position: toast.POSITION.TOP_RIGHT
      })
    setShowConfirmation(false);}
      }
    }
    else{toast.error("please input a proper date format ", {
      position: toast.POSITION.TOP_RIGHT
    })
  setShowConfirmation(false);}
    
  };

  const canceladding = () => {
    //  make array empity
    setShowConfirmation(false);
  };
  return (
    <div>
      <div className="hidden bg-light mx-5 ">
        {showaddition && (
          <div className="d-flex justify-content-center w-100">
            <h1
              className="col-6 d-inline "
              style={{ textAlign: "center", marginTop: "130px" }}
            >
              {" "}
              Add Super Deals!
            </h1>

            <i
              className="bi bi-plus-lg text-success col-6 "
              style={{ fontSize: "200px" }}
              role="button"
              onClick={viewproducts}
            ></i>
          </div>
        )}

        {showproducts && (
          <div className="w-100">
            <h1
              className="col-12 "
              style={{
                borderBottom: "1px solid gray",
                textAlign: "center",
                paddingBottom: "10px",
              }}
            >
              Super Deals
            </h1>

            <table style={{ backgroundColor: "#efefef" }}>
                  <thead>
                    <tr>
                      <th>index</th>
                      <th>Name</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedproducts.map((product1, index) => (
                      <TrHiddenProduct
                        key={index}
                        index={index + 1}
                        product={product1}
                        changeselection={changeselection}
                        selectedproducts={selectedproducts}
                      />
                    ))}
                  </tbody>
                </table>
                <h5>name</h5>
                <input
                type="text"
                value={Name}
                placeholder="name of the deal"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
              <h5>price</h5>
              <input
                type="number"
                value={price}
                placeholder="Price"
                onChange={(e) => {
                  setprice(e.target.value);
                }}
              ></input>
              <h5>Stock</h5>
              <input
                type="number"
                value={quantity}
                placeholder="avilable stock"
                onChange={(e) => {
                  setquantity(e.target.value);
                }}
              ></input>
              <div>
                <h2>Select Day and Month</h2>
                <input
                  type="text"
                  value={selectedDate}
                  onChange={handleDateChange}
                  placeholder="MM/DD"
                  style={{ borderColor: isValidFormat ? "initial" : "red" }}
                />
                {!isValidFormat && (
                  <p style={{ color: "red" }}>
                    Please enter a valid date in MM/DD format.
                  </p>
                )}
              </div>
              <div className="w-100 m-5 d-flex justify-content-center">
              <button
                className="btn w-50 btn-outline-secondary"
                onClick={viewselected}
              >
                add as Superdeals{" "}
              </button>
            </div>
            <form className="col-12  my-2">
              <div
                className="d-flex flex-wrap "
                style={{ maxHeight: "1000px", overflowY: "scroll" }}
              >
                <div className="col-12 my-2">
                  <SearchBar
                    query={query}
                    setquery={setquery}
                    search={search}
                  ></SearchBar>
                </div>

                <br></br>
                <table>
                  <thead>
                    <tr>
                      <th>index</th>
                      <th>Name</th>
                      <th>selected</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product1, index) => (
                      <TrHiddenProduct
                        key={index}
                        index={index + 1}
                        product={product1}
                        changeselection={changeselection}
                        selectedproducts={selectedproducts}
                      />
                    ))}
                  </tbody>
                </table>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    backgroundColor: "#efefef",
                  }}
                >

                </div>
                
              </div>
              
            </form>
            
          </div>
        )}
      </div>
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-modal-content">
            <p>this is your selected products for Super deals</p>
            {/* selected product */}

            <button
             onClick={() => confirmadding()}
            >
              Yes
            </button>
            <button onClick={canceladding}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

function TrHiddenProduct(props) {



  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.product.name}</td>
      <td>
        <button
          type="button"
          onClick={() => {
            props.changeselection(props.product);
          }}
        >
          {props.selectedproducts.indexOf(props.product) === -1
            ? "add"
            : "remove"}
        </button>
      </td>
      <ToastContainer />
    </tr>
  );
}

export { TrHiddenProduct };
