import React from 'react'
import "./delete.css"

function DeleteProduct() {
  return (
    <div>
    <div className='delete bg-light mx-5 '>
        <h1 className='col-12 '  style={{borderBottom:"1px solid gray",textAlign:"center" }} >Delete Product</h1>

        <form className='col-12  m-2'>
            <label htmlFor="ProductID" >product id :</label>
          
            <input type="text" className='my-5 btn mx-4 w-75' name="productid" style={{border:"1px solid gray" }} id="productid" placeholder="Enter product id" required/>
            <br></br>
           
            <button type="submit" className='btn btn-outline-secondary w-100' >Delete Product</button>
        </form>  
    </div></div>
  )
}

export default DeleteProduct