import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./components/Home";
import './app.css';

function App(){
  const [ login, setLogin ] = useState(true);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  return isLoggedIn ? <HomePage/> : login ? <Login signup={setLogin} setLog={setIsLoggedIn}/> : <Signup login={setLogin}/>
}

export default App;