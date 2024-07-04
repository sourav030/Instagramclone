import React from 'react'
import logo from "../img/logo.png"
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';



export default function Signup() {

    // Toast functionality for the default toast
    const notifyA = (msg) => {
        toast.error(msg)
    }
    const notifyB = (msg) => {
        toast.success(msg)
    }

   const navigate=useNavigate()

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const emialRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const passRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    const postData = () => {
        // checking email
        if(!emialRegex.test(email))
            {
                notifyA("Invalid email")
                return
            }
            // checking password
        else if(!passRegex.test(password)){
            notifyA("Invalid password")
            return
        }
        // sending data to server
        fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                username: username,
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
                    navigate("/signin")
                }
                console.log(data)
            }
            ))
    }

    return (
        <div className='signup'>
            <div className="form-container">
                <div className="form">
                    <img src={logo} alt="" className='signupLogo' />
                    <p className="loginPara">
                        sign up to see photos and video <br /> from our friends
                    </p>
                    <div>
                        <input
                            type="email"
                            name='email'
                            id='email'
                            value={email}
                            placeholder='emial'
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                    </div>

                    <div>
                        <input
                            type="text"
                            name='name'
                            id='name'
                            value={name}
                            placeholder='Enter full name'
                            onChange={(e) => {
                                setName(e.target.value)
                            }} />
                    </div>

                    <div>
                        <input
                            type="text"
                            name='username'
                            id='username'
                            value={username}
                            placeholder='username'
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }} />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                    </div>

                    <p className="loginPara" style={{ fontSize: "12px", margin: "3px 0px" }}>
                        by signing up, you agree to our terms <br /> data policy and cookies policy.
                    </p>

                    <input
                        type="submit"
                        id='submit-btn'
                        value="Signup"
                        onClick={() => { postData() }} />

                </div>
                <div className="form2">
                    Already  have an account?
                    <Link to="/signin">
                        <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
