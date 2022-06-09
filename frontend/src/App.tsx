import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/";
import Header from "./common/header/";
import Footer from "./common/footer/";
import CreateProduct from "./components/createProduct";
import RegisterEmailPage from "./common/RegisterEmailPage";
import Admin from "./components/admin/admin";
import Create from "./components/admin/create";
import Edit from "./components/admin/edit";
import Delete from "./components/admin/delete";
import "./index.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createproduct" element={<CreateProduct />} />
            <Route path="/registered" element={<RegisterEmailPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/create" element={<Create />} />
            <Route path="/admin/edit/:id" element={<Edit />} />
            <Route path="/admin/delete/:id" element={<Delete />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
