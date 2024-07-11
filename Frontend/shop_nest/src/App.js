import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Shop from './components/Shop';
import Signup from './components/Signup';
import Cart from './pages/Cart';
import Men from './pages/Mens';
import Profile from './pages/Profile';
// Ensure this matches the actual filename
import axios from 'axios';
import Payment from 'pages/Payment';
import ShippingTracking from 'pages/ShippingTrack';
import { AdminDashboard } from 'pages/admin';
import { Admins } from 'pages/admin/admins';
import { CreateAdmin } from 'pages/admin/admins/Create';
import AdminLogin from 'pages/admin/login/login';
import { Products as AdminProducts } from 'pages/admin/products';
import { CreateProduct } from 'pages/admin/products/Create';
import { EditProduct } from 'pages/admin/products/Edit';
import { Users } from 'pages/admin/users';
import 'react-toastify/dist/ReactToastify.css';
import { EditAdmin } from 'pages/admin/admins/Edit';

function App() {
  const [products, setProducts] = useState()
  const getProducts = () => {
    axios.get("http://localhost:5000/product").then(response => {
      setProducts(response.data)
    })
  }
  useEffect(() => {
    getProducts()
  }, [])

  
  const addToCart = (product) => {
    // Retrieve existing cart items from localStorage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Ensure cartItems is always an array
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }

    // Add the new product to the cartItems array
    cartItems.push(product);

    // Update localStorage with the updated cartItems array
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Set message to display when product is added to cart
    toast(`${product.name} added to cart!`);

    // Clear message after 3 seconds
    // setTimeout(() => {
    //   setMessage('');
    // }, 3000);
  };



  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home addToCart={addToCart}/>} />
        <Route path='/about' element={<About />} />
        <Route path='/shop' element={<Shop products={products ? products : []} addToCart={addToCart}/>} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/mens' element={<Men products={products?.filter(i => i.type === 'mens')} title={"ShopNest - Men's Clothing"} addToCart={addToCart} />} />
        <Route path='/womens' element={<Men products={products?.filter(i => i.type === 'womens')} title={"ShopNest - Women's Clothing"} addToCart={addToCart} />} />
        <Route path='/kids' element={<Men products={products?.filter(i => i.type === 'kids')} title={"ShopNest - Kid's Clothing"} addToCart={addToCart} />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/users' element={<Users />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/shipping' element={<ShippingTracking />} />
        
        <Route path='/products' element={<AdminProducts />} />
        <Route path='/product/create' element={<CreateProduct />} />
        <Route path='/product/:id' element={<EditProduct />} />

        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/admins' element={<Admins />} />
        <Route path='/admin/create' element={<CreateAdmin />} />
        <Route path='/admin/:id' element={<EditAdmin />} />

        <Route path='/dashboard' element={<AdminDashboard />} />


      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
