import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout/Layout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import About from "./components/Layout/About";
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';

const App = () => {
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> {/* Login route */}
        <Route path="/signup" element={<SignUp />} /> {/* Signup route */}
        <Route path="/:productId" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

}

export default App