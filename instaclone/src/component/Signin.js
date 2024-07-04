import React from 'react'
import "./Signin.css"
import logo from "../img/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { useContext } from 'react'
import { LoginContext } from '../context/Logincontex'

export default function Signin() {
  const {setLogin}=useContext(LoginContext)
  const notifyA = (msg) => {
    toast.error(msg)
}
const notifyB = (msg) => {
    toast.success("Signin success")
}

const navigate=useNavigate()
const [password, setPassword] = useState("")

const [email, setEmail] = useState("")
 const emialRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


 const postData = () => {
  // checking email
  if(!emialRegex.test(email))
      {
          notifyA("Invalid email")
          return
      }
      // checking password
 
  // sending data to server
  fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({

          email: email,
          password: password
      })
  }).then(res => res.json()

      .then(data => {
          if (data.error) {
              notifyA(data.error)
          }
          else {
              notifyB("Signup successful")
              console.log(data)
              let id="no"
              id=data._id
              localStorage.setItem("jwt",data.token)
              localStorage.setItem("id",id)
              
              setLogin(true)
              navigate("/")
          }
          console.log(data)
      }
      ))
}


  return (
    <div className='signIn'>
      <div className='loginForm'>
      <img src={logo} alt="" className='signupLogo' />
        <div>
            <input 
            type="email" 
            name="email" 
            id='email' 
            placeholder='email' 
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}/>
        </div>
        <div>
            <input 
            type="password" 
            name="password" 
            id='password' 
            placeholder='password' 
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}/>
        </div>
        <div>
        <input 
        type="submit" 
        value="Sign in" 
        id='login-btn' 
        onClick={postData}/>

        </div>
        <div className="loginform2">
            Don't have an account?
           <Link to="/signup">
           <span style={{color:"blue", cursor:"pointer"}}>Sign in</span>
           </Link>
        </div>
      </div>
    </div>
  )
}
