import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";

import googlelogo from '../images/google-logo.png';
import '../css/Login.css'
import bg from '../images/bg.jpg'

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
          // maybe trigger a loading screen
          return;
        }
        if (user) navigate("/dashboard");
      }, [user, loading]);

  return (
    <div className="login-wrap text-center">
        <img
        className="login-bg"
        src={bg}
        alt=""
        />
        <div className="login-content">        
            <input 
                type='email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail Address"
                className='input-lg'
            /><br />
            <input 
                type='password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className='input-lg'
            /><br />
            <button className='btn btn-success' onClick={() => logInWithEmailAndPassword(email, password)}>Submit</button>
            <br />
            <button className="btn btn-dark" onClick={signInWithGoogle}>
                Login with <img src={googlelogo} alt="Google Logo" />
            </button>
        </div>
    </div>
  )
}
