import React from "react";
import './form.css';

function Login(props){
  return (
    <section className="form">
      <title>Login</title>
      <h1 id="titlebar">Login</h1>
      <button onClick={()=>{
        props.signup(false);
      }}>Signup</button>
    </section>
  )
}

export default Login;