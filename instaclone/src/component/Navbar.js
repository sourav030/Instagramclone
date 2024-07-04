import React from 'react'
import logo from '../img/logo.png'
import { useContext } from 'react'
import "./Navbar.css"
import { LoginContext } from '../context/Logincontex'
import { Link } from 'react-router-dom'

export default function Navbar({login}) {
    const {setModalOpen,modalOpen}=useContext(LoginContext)
    const loginStatus=()=>{
        const token=localStorage.getItem("jwt")
        if(token || login){
            return [
                <>
                     <Link to="/profile">
                    <li> profile</li>
                </Link>
                <Link to="/createPost">
                 Create Post
                </Link>
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to={""}>
                        <button className='primaryBtn'
                        onClick={()=>{setModalOpen(true)}}>
                            Log Out
                        </button>
                </Link>
                </>
            ]
        }
        else{
            return [
                <>
                 <Link to="/signup">
                    <li>Signup</li>
                </Link>
                <Link to="/signin">
                    <li>Signin</li>
                </Link>
                
                </>
            ]
        }
    }
    return (
        <div className='navbar'>
            <img src={logo} alt="logo" />
            <ul className="nav-menu">
                
               {
                loginStatus()
               }

            </ul>
        </div>
    )
}
