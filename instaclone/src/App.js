import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Signin from './component/Signin';
import Profile from './component/Profile';
import Signup from './component/Signup';
import Home from './component/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Createpost from './component/Createpost';
import { createContext } from 'react';
import { LoginContext } from './context/Logincontex';
import { useState } from 'react';
import Modal from './component/Modal';
import UserProfile from './component/UserProfile';
function App() {
  const [login, setLogin] = useState(false)
  const [modalOpen, setModalOpen]=useState(false)
  return (
    <BrowserRouter>
      <LoginContext.Provider value={{setLogin,setModalOpen,modalOpen}}>

        <div className="App">
          <Navbar  login={login}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route exact path='/profile' element={<Profile />} />
            <Route path='/createPost' element={<Createpost />} />
            <Route path='/profile/:userid' element={<UserProfile />} />
          </Routes>
          <ToastContainer theme='dark' />
           {
            modalOpen && <Modal setModalOpen={setModalOpen}/>
           }
        </div>

      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;
