import React from "react";
import './form.css';

function Signup(props){
  return (
    <section className="form">
      <title>Signup</title>
      <h1 id="titlebar">Signup</h1>
      <button onClick={()=>{
        props.login(true)
      }}>Login</button>
    </section>
  )
}

export default Signup;