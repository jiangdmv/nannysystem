import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/";
import Header from "./common//header/";
import Footer from "./common/footer/";
import CreateProduct from "./components/createProduct";
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
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
