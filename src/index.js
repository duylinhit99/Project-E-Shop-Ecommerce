import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes, 
  Route
} from 'react-router-dom'
import Home from './Compenents/Layout/Home';
import Blog from './Compenents/Blog/Blog'
import BlogDetail from './Compenents/Blog/BlogDetail';
import Index from './Compenents/Member/Index';
import Account from './Compenents/Member/Account';
import MyProduct from './Compenents/Product/MyProduct';
import AddProduct from './Compenents/Product/AddProduct';
import EditProduct from './Compenents/Product/EditProduct';
import ShowProduct from './Compenents/Product/ShowProduct';
import ProductDetail from './Compenents/Product/ProductDetail';
import Cart from './Compenents/Cart/Cart';
import ProductWistlist from './Compenents/Product/ProductWistlist';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
          <App>
              <Routes>
                  <Route index path='/' element={<ShowProduct/>}/>
                  <Route path='/blog' element={<Blog/>}/>
                  <Route path='/blog/detail/:id' element={<BlogDetail/>}/>
                  <Route path='/login' element={<Index/>}/>
                  <Route path='/account' element={<Account/>}/>
                  <Route path='/account/product-list' element={<MyProduct/>}/>
                  <Route path='/account/product/add' element={<AddProduct/>}/>
                  <Route path='/account/product/edit/:id' element={<EditProduct/>}/>
                  <Route path='/product/detail/:id' element={<ProductDetail/>}/>
                  <Route path='/product/cart' element={<Cart/>}/>
                  <Route path='/product/addtowistlist' element={<ProductWistlist/>}/>
              </Routes>
          </App>
      </Router>
  </React.StrictMode>
);

reportWebVitals();
