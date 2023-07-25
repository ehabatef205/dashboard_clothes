import React from 'react'
import './left_panel.css'
function LeftPanel({ setpage }) {
  const changePage = (page) => {
    console.log(page.target.innerText)
    setpage(page.target.innerText)
  }
  return (
    <div className='left-panel'>
      <div className='left-panel-item'>

        <div style={{ borderBottom: "1px solid white" }} ><h3 className='m-3'>Admin Panel</h3> </div>
        <div className='my-3'>
          <div className='left-panel-item left-sub-item'>
            <h4>Main category</h4>
            <ul>
              <li onClick={changePage} >View Main Category</li>
            </ul>
          </div>
        </div>
        <div className='my-3'>
          <div className='left-panel-item left-sub-item'>
            <h4>Sub category</h4>
            <ul>
              <li onClick={changePage} >View Sub Category</li>
            </ul>
          </div>
        </div>
        <div className='my-3'>
          <div className='left-panel-item left-sub-item'>
            <h4>Products</h4>
            <ul>
              <li onClick={changePage} >Add Product</li>
              <li onClick={changePage}>Delete Product</li>
              <li onClick={changePage}>Update Product</li>
            </ul>
          </div>
        </div>
        <div className='left-panel-item left-sub-item'>
          <h4>Orders</h4>
          <ul>
            <li onClick={changePage}>Orders</li>
          </ul>
        </div>
        <div className='left-panel-item left-sub-item'>
          <h4>Users</h4>
          <ul>
            <li onClick={changePage}>Pan User</li>
          </ul>
        </div>
        <div className='left-panel-item left-sub-item'>
          <h4>Supplies</h4>
          <ul>
            <li onClick={changePage}>Give Supplier Access</li>
            <li onClick={changePage}>Delete Supplier</li>
          </ul>
        </div>
        <div className='left-panel-item left-sub-item'>
          <h4>Analytics</h4>
          <ul>
            <li onClick={changePage}>Analytics</li>
          </ul>
        </div>
        <div className='left-panel-item left-sub-item'>
          <h4>Logout</h4>
          <ul>
            <li onClick={changePage}>Logout</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LeftPanel