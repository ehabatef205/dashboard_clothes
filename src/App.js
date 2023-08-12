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

function App() {
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

  return (
    <div className="App">
      {isLoggedIn ? <>
        <LeftPanel setpage={setPage} />
        <div style={{ width: "100%", padding: "1%" }}>
          {page === '#' && <h1 className='d-flex bg-light mx-5  h-50 headerone'>welcome to our admin panel please choose what to do from the side panel.</h1>}
          {page === 'View Main Category' && <MainCategory />}
          {page === 'View Sub Category' && <SubCategory />}
          {page === 'Add Product' && <AddProduct />}
          {page === 'Add Product from excel' && <AddProductFromExcel />}
          {page === 'Hidden Product' && <HiddenProduct />}
          {page === 'Delete Product' && <DeleteProduct />}
          {page === 'Update Product' && <UpdateProduct />}
          {page === 'Orders' && <Orders/>}
          {page === 'Returns' && <Returns/>}
          {page === 'Shipping' && <h1 className='d-flex bg-light mx-5  h-50 headerone'>Operation Under Design</h1>}
          {page === 'Analytics' && <h1 className='d-flex bg-light mx-5  h-50 headerone'>welcome to our admin panel please choose what to do from the side panel.</h1>}
          {page === 'Users' && <UserView />}
          {page === 'Pan User' && <PanUser />}
          {page === 'Create Supplier' && <CreateSupplier />}
          {page === 'Edit Suppliers' && <SupplierList />}
          {page === 'Logout' && <h1 className='d-flex bg-light mx-5  h-50 headerone'>welcome to our admin panel please choose what to do from the side panel.</h1>}
        </div>
      </> : <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;
