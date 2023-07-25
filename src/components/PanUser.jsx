import React from 'react'
import "./delete.css"
function PanUser() {
  return (
    <div > 
      <div className='delete bg-light mx-5 '>
        <h1 className='col-12 '  style={{borderBottom:"1px solid gray",textAlign:"center" }} >Pan User</h1>
        <form className='col-12  m-2'>
            <label htmlFor="UserID">user id :</label>
            <input style={{border:"1px solid gray" }} className='my-5 btn mx-4 w-75' type="text" name="userid" id="userid" placeholder="Enter user id" required/>
            <button type="submit" className='btn btn-outline-secondary w-100' >Pan User</button>
        </form>
    </div></div>
  )
}

export default PanUser