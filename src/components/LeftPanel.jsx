import React from 'react'
import './left_panel.css'
function LeftPanel({ setpage, logout }) {
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
              <li onClick={changePage}>Product</li>
              <li onClick={changePage}>Delete Product</li>
              <li onClick={changePage}>Update Product</li>
              <li onClick={changePage}>First visit</li>
              <li onClick={changePage}>Super deals</li>
            </ul>
          </div>
        </div>
        <div className='left-panel-item left-sub-item'>
          <h4>Orders</h4>
          <ul>
            <li onClick={changePage}>Orders</li>
          </ul>
          <ul>
            <li onClick={changePage}>Returns</li>
          </ul>
        </div>
        <div className='left-panel-item left-sub-item'>
          <h4>User</h4>
          <ul>
            <li onClick={changePage}>Users</li>
          </ul>
        </div>
        <div className='left-panel-item left-sub-item'>
          <h4>Suppliers</h4>
          <ul>
            <li onClick={changePage}>Create Supplier</li>
            <li onClick={changePage}>Edit Suppliers</li>
          </ul>
        </div>
        <div className='left-panel-item left-sub-item'>
          <h4>Shipping</h4>
          <ul>
            <li onClick={changePage}>Shipping</li>
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
            <li onClick={logout}>Logout</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LeftPanel