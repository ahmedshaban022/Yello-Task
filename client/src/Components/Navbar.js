import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar(props) {
    const navigate = useNavigate();
    return (
        <div>
           <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <NavLink className="navbar-brand fw-bold text-success" to="/">
      Yello
    </NavLink>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
        {/* <li className="nav-item">
          <NavLink className="nav-link " aria-current="page"to="/">
          Posts
          </NavLink>
        </li> */}

{!localStorage.getItem('token') ?

        <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page"to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page"to="/register">
            Register
          </NavLink>
        </li>
      </ul>
       
       :   
     
       <ul className='ms-auto navbar-nav'>
          <li > <button className='btn text-danger fw-bold pointer' onClick={()=>{localStorage.clear();navigate('/login')}}>Logout</button> </li>
      </ul>
      
      }

    </div>
  </div>
</nav>

        </div>
    );
}

export default Navbar;