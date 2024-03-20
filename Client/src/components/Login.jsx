import React, {useState, useEffect} from "react";
import './form.css';

function Login(props){

  const [userName , setUserName ] = useState('');
  const [userPass , setUserPass ] = useState('');
  const [ showPass , setShow ] = useState(false);
  const [ message, setMessage ] = useState('');

  useEffect(()=>{

    const validregex = /[!@#$%^&*()+=<>?/,.{}:;"' ]/gi;
    if(validregex.test(userName) || validregex.test(userPass)){
      setMessage('Invalid Input');
    }else{
      setMessage('');
    }
  },[userName,userPass]);

  function login(obj){
    props.setLog(true)
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