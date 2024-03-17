import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import './app.css';

function App(){
  const [ login, setLogin ] = useState(true);
  return login ? <Login signup={setLogin} /> : <Signup login={setLogin}/> 
}

export default App;