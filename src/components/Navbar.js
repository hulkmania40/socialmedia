import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login'
import Home from './Home';
import logo from '../images/logo.png'
import '../css/Navbar.css'
import Dashboard from './Dashboard';

export default function Navbar() {
  return (
     
    <Router>
        <nav className="navbar navbar-expand-lg navbar-light navcol" >
            <Link className="navbar-brand" to="/">
                <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="Social Media App" />
                Social Media App
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to='/'>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/login'>Login</Link>
                </li>
                </ul>
            </div>
        </nav>
        <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/" exact element={<Home />} />
        </Routes>
    </Router>
  )
}
