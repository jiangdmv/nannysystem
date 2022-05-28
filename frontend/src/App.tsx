import React from "react";
import Home from "./components/home/";
import Header from "./common//header/";
import Footer from "./common/footer/";
import "./index.css";

function App() {
  return (
    <>
      <Header />
      <div className="body">
        <Home />
      </div>
      <Footer />
    </>
  );
}

export default App;
