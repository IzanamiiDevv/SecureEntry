import React from "react";
import './form.css';

function Login(props){
  return (
    <section className="form">
      <title>Login</title>
      <h1 id="titlebar">Login</h1>
      <div className="container">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name"placeholder="IzanamiiDevv"/>
        <br />
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" placeholder="1234567890"/>
        <br />
        <label htmlFor="hidepass">Show Password</label>
        <input type="checkbox"id="hidepass" />
      </div>
      <button>Confirm</button>
      <br />
      <button onClick={()=>{
        props.signup(false);
      }}>Signup</button>
    </section>
  )
}

export default Login;