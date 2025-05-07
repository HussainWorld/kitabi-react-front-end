import { useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

import './NavBar.css'

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };


  return (
    <nav>
      {user ? (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
        <Link to='/' className="nav-link">
          <img id='logo-image' src="../../../Images/KetabyLogo.svg" alt="logo-image" />
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              {/* Dashboard */}
              <Link to="/" className="nav-link">Dashboard</Link>
            </li>

              <li className="nav-item">
              {/* My Advertisements */}
                <Link to='/my-ads' className="nav-link">My Advertisements</Link>
              </li>

              <li className="nav-item">
              {/* Create ad */}
                <Link to='/create-ad' className="nav-link">Create AD</Link>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                   <img src="https://f.nooncdn.com/s/app/com/namshi/images/flag-bahrain.svg" alt="" />
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">
                    Saudi Arabia &nbsp;
                    <img src="https://f.nooncdn.com/s/app/com/namshi/images/flag-saudi.svg" alt="" />
                  </a></li>

                  <li><a className="dropdown-item" href="#">
                    Kuwait &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                    <img src="https://f.nooncdn.com/s/app/com/namshi/images/flag-kuwait.svg" alt="" />
                  </a></li>

                  <li><a className="dropdown-item" href="#">
                    Bahrain &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                    <img src="https://f.nooncdn.com/s/app/com/namshi/images/flag-bahrain.svg" alt="" />
                  </a></li>                  
                </ul>
              </li>
            </ul>

            
            
            <p id='welcomePara'>Welcome, {user.username}</p>
              
            
            <button id='loginSignUpBtn'>
              <Link to='/' onClick={handleSignOut} className="nav-link">
                Sign Out
              </Link>
            </button>
            

          </div>
        </div>
      </nav>
      ) : (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">

          <Link to='/' className="nav-link">
          <img id='logo-image' src="../../../Images/KetabyLogo.svg" alt="logo-image" />
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
              <Link to='/' className="nav-link">
              <a className="navbar-brand">Home</a>
              </Link>
            </ul>
            
              <button id='loginSignUpBtn'>
                <Link to='/sign-in' className="nav-link">Sign In</Link>
              </button>

              <a id='loginSlash' className="nav-link" aria-current="page">/</a>

              <button id='loginSignUpBtn'>
                <Link to='/sign-up' className="nav-link">Sign Up</Link>
              </button>
              
          </div>
        </div>
      </nav>
      )}
    </nav>
  );
};

export default NavBar;
