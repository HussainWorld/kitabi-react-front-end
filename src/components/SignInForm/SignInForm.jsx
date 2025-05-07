import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';

import { signIn } from '../../services/authService';

import { UserContext } from '../../contexts/UserContext';

import './SignInForm.css'

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (

        <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your username and password!</p>

                  <p className="text-white-50 mb-5">{message}</p>

                  <form autoComplete='off' onSubmit={handleSubmit}>
                  {/* UserName Input */}
                  <div className="form-outline form-white mb-4">
                  <label className="form-label">User Name</label>
                    <input
                          type='text'
                          autoComplete='off'
                          id='username'
                          value={formData.username}
                          name='username'
                          onChange={handleChange}
                          required
                    />
                  </div>
                  {/* Password Input */}
                  <div className="form-outline form-white mb-4">
                  <label className="form-label" htmlFor="typePasswordX">Password</label>
                    <input
                        type='password'
                        autoComplete='off'
                        id='password'
                        value={formData.password}
                        name='password'
                        onChange={handleChange}
                        required
                    />
                  </div>

                  {/* <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p> */}

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>

                  <img src="../facebookIcon.svg" alt="" />

                  </form>
                  
                  
                  {/* Social media login buttons */}
                  <div className="d-flex justify-content-center text-center mt-4 pt-1">

                    <a className="text-white">
                    <img id='shareImg' src="../../../Images/facebookIcon.svg" alt="shareImg" border="0" />
                    </a>
                    
                    <a className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2">
                    <img id='shareImg' src="../../../Images/x.comIcon.svg" alt="shareImg" border="0" />
                    </i></a>

                    <a className="text-white"><i className="fab fa-google fa-lg">
                    <img id='shareImg' src="../../../Images/googleIcon.svg" alt="shareImg" border="0" />
                    </i></a>

                  </div>
                </div>

                <div>
                  
                  <p className="mb-0">
                    Don't have an account?
                    <Link to='/sign-up'>
                    <br />
                    <a className="text-white-50 fw-bold">Sign up</a>
                    </Link>
                  </p>
                  
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  );
};

export default SignInForm;
