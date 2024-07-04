import React, { useContext } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import "./Modal.css"
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../context/Logincontex'

export default function Modal({setModalOpen}) {
    const {setLogin}=useContext(LoginContext)
    const navigate=useNavigate()
    return (
        <div className='darkBg' onClick={()=>{setModalOpen(false)}}>
            <div className="centered">
                <div className="modal">
                    {/* modalHeader */}
                    <div className="modalHeader">
                        <h5 className='heading'>Confirm</h5>
                    </div>
                    <button className='closeBtn'
                    onClick={()=>{setModalOpen(false)}}>
                        <RiCloseLine></RiCloseLine>
                    </button>
                    {/* modal content */}
                    <div className="modalContent">
                        Are you really want to log Out?
                    </div>
                    <div className="modalActions">
                        <div className="actionContainer">
                            <button className='logOutBtn'onClick={()=>{
                                setModalOpen(true); 
                                setLogin(false);
                                localStorage.clear();
                                navigate("/signup")
                            }}>Log Out</button>
                            <button className='cancelBtn'
                            onClick={()=>{setModalOpen(false)}}>cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
