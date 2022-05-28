import React from "react";
import { useState, useEffect } from "react";

import Login from "../login";
import Logout from "../logout";

function Home() {
  const [isLoggdIn, setIsLoggedin] = useState(false);

  return (
    <>
      {isLoggdIn ? (
        <Logout handleLogout={() => setIsLoggedin(false)} />
      ) : (
        <Login handleLogin={() => setIsLoggedin(true)} />
      )}
      <div>Home Page</div>
    </>
  );
}

export default Home;
