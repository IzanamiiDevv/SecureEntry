import React from "react";
import './form.css';

function Signup(props){
  return (
    <section className="form">
      <title>Signup</title>
      <h1 id="titlebar">Signup</h1>
      <div className="container">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" placeholder="IzanamiiDevv"/>
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
        props.login(true)
      }}>Login</button>
    </section>
  )
}

export default Signup;