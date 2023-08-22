import './App.css';
import AddProduct from './components/AddProduct';
import DeleteProduct from './components/DeleteProduct';
import LeftPanel from './components/LeftPanel';
import { useState } from 'react';
import UpdateProduct from './components/UpdateProduct';
import PanUser from './components/PanUser';
import MainCategory from './components/MainCategory';
import SubCategory from './components/SubCategory';
import HiddenProduct from './components/HiddenProduct';
import CreateSupplier from './components/create supplier';
import SupplierList from './components/SupplierList';
import Login from './dir/login';
import AddProductFromExcel from './components/AddProductFormExcel';
import Orders from './components/orders';
import Returns from './components/returns';
import UserView from './components/users';
import { auth } from './api/ADMIN';
import Superdeals from './components/Superdeals'
import Firstvisit from './components/Firstvisit'
import { Cookies } from 'react-cookie'

function App() {
  const cookie = new Cookies()
  const [page, setPage] = useState('#')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useState(()=>{
    try{
    auth().then(e=>{
      if(e.auth===true)
      setIsLoggedIn(true)
    else{
      setIsLoggedIn(false)
    }
    })}
    catch(err){
      setIsLoggedIn(false)
    }
  },[])

  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    cookie.remove("AuthAdmin")
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? <>
        <LeftPanel logout={handleLogout} setpage={setPage} />
        <div style={{ width: "100%", padding: "1%" }}>
          {page === '#' && <h1 className='d-flex bg-light mx-5  h-50 headerone'>welcome to our admin panel please choose what to do from the side panel.</h1>}
          {page === 'View Main Category' && <MainCategory />}
          {page === 'View Sub Category' && <SubCategory />}
          {page === 'Add Product' && <AddProduct />}

          {page === 'Product' && <HiddenProduct />}
          {page === 'Delete Product' && <DeleteProduct />}
          {page === 'Update Product' && <UpdateProduct />}
          {page === 'Orders' && <Orders/>}
          {page === 'First visit' && <Firstvisit />}
          {page === 'Super deals' && <Superdeals/>}
          {page === 'Returns' && <Returns/>}
          {page === 'Shipping' && <h1 className='d-flex bg-light mx-5  h-50 headerone'>Operation Under Design</h1>}
          {page === 'Analytics' && <h1 className='d-flex bg-light mx-5  h-50 headerone'>Waitting for real Analytics  .</h1>}
          {page === 'Users' && <UserView />}
          {page === 'Ban User' && <PanUser />}
          {page === 'Create Supplier' && <CreateSupplier />}
          {page === 'Edit Suppliers' && <SupplierList />}
          {page === 'Logout' && <h1 className='d-flex bg-light mx-5  h-50 headerone'>welcome to our admin panel please choose what to do from the side panel.</h1>}
        </div>
      </> : <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;
