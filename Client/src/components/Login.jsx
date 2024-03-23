import React, {useState, useEffect} from "react";
import './form.css';

function Login(props){
  const validregex = /[!@#$%^&*()+=<>?/,.{}:;"' ]/gi;
  const [userName , setUserName ] = useState('');
  const [userPass , setUserPass ] = useState('');
  const [ showPass , setShow ] = useState(false);
  const [ message, setMessage ] = useState('');

  useEffect(()=>{
    if(validregex.test(userName) || validregex.test(userPass)){
      setMessage('Invalid Input');
    }else{
      setMessage('');
    }
  },[userName,userPass]);

  function login({name, password}){
    if(validregex.test(name + password) || (name + password).length == 0){setMessage("Invalid Input")}else{
      setMessage('Sending Request to Server Please Wait...');
      const data = {
        name: name,
        password: password
      }
      fetch('http://localhost:3000/LogIn',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      }).then(response => response.text())
      .then(data => {
        if(data == "Login Sucessfull"){props.setLog(true)}else{
          setMessage(data)}
      }).catch(err => {
        setMessage("Something Went Wrong Pls Check Again");
      })
    }
  }

  return (
    <section className="form">
      <title>Login</title>
      <h1 id="titlebar">Login</h1>
      <hr />
      <div className="container">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name"placeholder="IzanamiiDevv" onChange={(e)=>{
          setUserName(e.target.value);
        }}/>
        <br />
        <label htmlFor="password">Password:</label>
        {(showPass) ? 
        <input type="text" id="password" placeholder="1234567890" onChange={(e)=>{
          setUserPass(e.target.value);
        }}/>:
        <input type="password" id="password" placeholder="1234567890" onChange={(e)=>{
          setUserPass(e.target.value);
        }}/>}
        <br />
        <label htmlFor="hidepass">Show Password</label>
        <input type="checkbox"id="hidepass" onChange={()=>{
          setShow(!showPass);
        }}/>
      </div>
      <button id="btn" onClick={(e)=>{
        login({name:userName,password:userPass});
      }}>Confirm</button>
      <br />
      <hr />
      <p id="display">{message}</p>
      <p>Do You Already Have an Account?</p>
      <p>Try Signing In.</p>
      <button onClick={()=>{
        props.signup(false);
      }}>Signup</button>
    </section>
  )
}

export default Login;