import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/";
import Header from "./common/header/";
import Footer from "./common/footer/";
import CreateProduct from "./components/createProduct";
import RegisterEmailPage from "./common/RegisterEmailPage";
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
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
