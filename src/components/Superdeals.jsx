import React, { useEffect, useState } from 'react'
import * as product from '../api/product'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './deals.css'
import './delete.css'

export function SearchBar({ query,setquery ,search }) {



  
    return (
      <div className="search-input-container  d-flex justify-content-center">
        <input
          type="text"
          className="search-input"
          placeholder="Search Products"
          value={query}
          onChange={(e)=>{setquery(e.target.value)}}
        />
        <i className="bi bi-search my-2 search-icon "role="button" 
        onClick={search}
         ></i>
      </div>
    );
  }
  

export default function Superdeals() {

    
    
    const [products, setProducts] = useState([])
    const [query, setquery] = useState("")
    const getProducts = async () => {
        await product.all_product().then(e => {
            setProducts(e.response)
            console.log(e.response)
        })
    }
    useEffect(() => {
        
        getProducts()
    }, [])
    const search=() => {
        if (query === "") getProducts();
        else {
          product.searchpage(query).then((e) => {
            setProducts(e.response);
          });
        }
      };

    
   
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showproducts, setshowproducts] = useState(false);
    const [showaddition, setshowaddition] = useState(true);

    const [selectedProductId, setSelectedProductId] = useState(null);
    // viewproducts

    const viewproducts = () => {
     
        setshowproducts(true);
        setshowaddition(false);
      };
      const viewselected = () => {
        setShowConfirmation(true);
      };
   
    // const confirmadding = async () => {
    //    toast.success("Done ", {
    //       position: toast.POSITION.TOP_RIGHT
    //     })
    //   setShowConfirmation(false);
    // };
    
    const canceladding = () => {
    //  make array empity
      setShowConfirmation(false);
    };
    return (
        <div>
       
       
            <div className='hidden bg-light mx-5 '>
               
               {showaddition &&(
               <div className='d-flex justify-content-center w-100'>
                <h1 className='col-6 d-inline ' style={{  textAlign:"center",marginTop:"130px"}} > Add Super Deals!</h1>
                
 <i className='bi bi-plus-lg text-success col-6 ' style={{fontSize:"200px"}} role='button' onClick={viewproducts} ></i>
               </div>)
               }
               
                {showproducts &&(
                    <div  className='w-100'>
                <h1 className='col-12 ' style={{ borderBottom: "1px solid gray", textAlign: "center"  ,paddingBottom:"10px"}} >Super Deals</h1>

                <form className='col-12  my-2' >
                    <div
                        className="d-flex flex-wrap " style={{maxHeight:"1000px" ,overflowY:"scroll"}}
                    >
                       
                        <div className="col-12 my-2" >
                        <SearchBar query={query}setquery={setquery} search={search}></SearchBar>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>index</th>
                                    <th>Name</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product1, index) => (
                                    <TrHiddenProduct key={index} index={index + 1} product={product1} />
                                ))}
                                
                            </tbody>
                        </table>
                        
                    </div>
                </form>
                <div className='w-100 m-5 d-flex justify-content-center' >
                    <button className='btn w-50 btn-outline-secondary' onClick={viewselected}>add as Superdeals </button>
                </div>
                </div> )}
            </div>
            {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-modal-content">
            <p>this is your selected products for Super deals</p>
            {/* selected product */}
           
           <button 
        //    onClick={() => confirmadding()}
           >Yes</button> 
            <button onClick={canceladding}>No</button> 
          </div>
        </div>
      )}
        </div>
    )
}


function TrHiddenProduct(props) {

    const [view, setView] = useState(false)

    const hidden = async (id) => {
        setView(!view)
    }

    return (
        <tr>
            <td>{props.index}</td>
            <td>{props.product.name}</td>
            <td><input type="checkbox" checked={view} onChange={() => { hidden(props.product._id)  }} style={{ height: "18px", width: "18px" }} /></td>
         <ToastContainer />
        </tr>
       
    )
}

export { TrHiddenProduct }
