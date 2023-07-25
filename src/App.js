import './App.css';
import AddProduct from './components/AddProduct';
import DeleteProduct from './components/DeleteProduct';
import LeftPanel from './components/LeftPanel';
import { useState } from 'react';
import UpdateProduct from './components/UpdateProduct';
import PanUser from './components/PanUser';
import MainCategory from './components/MainCategory';
import SubCategory from './components/SubCategory';

function App() {
  const [page, setPage] = useState('#')
  return (
    <div className="App">

      <LeftPanel setpage={setPage} />
      <div style={{ width: "100%", padding: "1%" }}>
        {page === '#' && <h1 className='d-flex bg-light mx-5  h-50 headerone'>welcome to our admin panel please choose what to do from the side panel.</h1>}
        {page === 'View Main Category' && <MainCategory />}
        {page === 'View Sub Category' && <SubCategory />}
        {page === 'Add Product' && <AddProduct />}
        {page === 'Delete Product' && <DeleteProduct />}
        {page === 'Update Product' && <UpdateProduct />}
        {page === 'Orders' && <h1 className='d-flex bg-light mx-5  h-50 headerone'>welcome to our admin panel please choose what to do from the side panel.</h1>}
        {page === 'Analytics' && <h1 className='d-flex bg-light mx-5  h-50 headerone'>welcome to our admin panel please choose what to do from the side panel.</h1>}
        {page === 'Pan User' && <PanUser />}
        {page === 'Give Supplier Access' && <h1 className='d-flex bg-light mx-5  h-50 headerone'>welcome to our admin panel please choose what to do from the side panel.</h1>}
        {page === 'Delete Supplier' && <h1 className='d-flex bg-light mx-5  h-50 headerone'>welcome to our admin panel please choose what to do from the side panel.</h1>}
        {page === 'Logout' && <h1 className='d-flex bg-light mx-5  h-50 headerone'>welcome to our admin panel please choose what to do from the side panel.</h1>}
      </div>
    </div>
  );
}

export default App;
