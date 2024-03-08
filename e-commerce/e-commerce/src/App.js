import {Routes, Route} from 'react-router-dom'
import './App.css';
import Cart from './HomePage/Cart';
import HomePage from './HomePage/HomePage';
import Login from './HomePage/Login';
import Product from './HomePage/Product';
import Product2 from './HomePage/Product2';
import Product3 from './HomePage/Product3';
import ProductList from './HomePage/ProductList';
import Register from './HomePage/Register';
import ProductList2 from './HomePage/ProductList2';
import ProductList3 from './HomePage/ProductList3';
import Page2 from './HomePage/Page2'; 
import { useSelector } from 'react-redux';
import Story from './HomePage/Story';
import Thanhtoan from './HomePage/thanhtoan';
import UpdateInforUser from './HomePage/UpdateInforUser';
import Notification from './components/Notification';
import OrderHistory from './phanloaisp/OrderHistory';
import OrderDetail from './phanloaisp/OrderDetail';
import ProductListByCategory from './phanloaisp/ProductListByCategory';

function App() {
  const cartItems = useSelector((state) => state.cart.itemsList);
  return (
    <div className="App">
    
      <Routes> 
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/updateuserdetails" element={<UpdateInforUser />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/noti" element={<Notification />}/>
        <Route path="/product" element={<Product />}/>
        <Route path="/product2/:id" element={<Product2 />}/>
        <Route path="/product3/:id" element={<Product3 />}/>
        <Route path="/productlist" element={<ProductList />}/>
        <Route path="/productlist2" element={<ProductList2 />}/>
        <Route path="/productlist3" element={<ProductList3 />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/order-history" element={<OrderHistory />}/>
        <Route path="/order-detail/:orderId" element={<OrderDetail />} />
        <Route path="/page2" element={<Page2 />}/>
        <Route path="/story" element={<Story />}/>
        <Route path="/cash" element={<Thanhtoan/>}/>
        {/* <Route path="/products/:category" element={ProductListByCategory} /> */}
        
      </Routes>

    </div>
  );
}

export default App;
