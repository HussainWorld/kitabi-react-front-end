import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';

import { signUp } from '../../services/authService';

import { UserContext } from '../../contexts/UserContext';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
    email: '',
    phone: '',
    gender: '',
    birthDate: '',
  });

  const { username, password, passwordConf, email, phone, gender, birthDate } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    const isEmailInvalid = !email || !/\S+@\S+\.\S+/.test(email);
    const isPhoneInvalid = !phone || !/^\d{8}$/.test(phone);
    const isGenderInvalid = !gender;
    const isBirthDateInvalid = !birthDate;
    const isPasswordInvalid = !password || password.length < 3;
    const isPasswordMismatch = password !== passwordConf;

    return (
      !username ||
      isEmailInvalid ||
      isPhoneInvalid ||
      isGenderInvalid ||
      isBirthDateInvalid ||
      isPasswordInvalid ||
      isPasswordMismatch
    );
  };

  return (
    <section className="vh-100 gradient-custom">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">Sign up</h2>
                <p className="text-white-50 mb-5">Please enter your information!</p>

                <p className="text-white-50 mb-5">{message}</p>

                <form onSubmit={handleSubmit}>
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

                {/* Email Imput */}
                <div className="form-outline form-white mb-4">
                <label className="form-label" >Email</label>
                  <input
                    type='email'
                    id='email'
                    value={email}
                    name='email'
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="form-outline form-white mb-4">
                <label className="form-label" >Phone Number</label>
                  <input
                    type='text'
                    id='phone'
                    value={phone}
                    name='phone'
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Date of Birth */}
                <div className="form-outline form-white mb-4">
                <label className="form-label" >Date of Birth</label>
                  <input
                    type='date'
                    id='birthDate'
                    value={birthDate}
                    name='birthDate'
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Gender */}
                <div className="form-outline form-white mb-4">
                <label className="form-label" >Gender</label>
                <select
                  id='gender'
                  name='gender'
                  value={gender}
                  onChange={handleChange}
                  required
                >
                  <option value=''>Select Gender</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                </select>
                </div>

                {/* Password Input */}
                <div className="form-outline form-white mb-4">
                <label className="form-label" >Password</label>
                  <input
                    type='password'
                    id='password'
                    value={password}
                    name='password'
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-outline form-white mb-4">
                <label className="form-label" htmlFor="typePasswordX">Confirm Password</label>
                  <input
                    type='password'
                    id='confirm'
                    value={passwordConf}
                    name='passwordConf'
                    onChange={handleChange}
                    required
                  />
                </div>

                <button className="btn btn-outline-light btn-lg px-5" disabled={isFormInvalid()}>Sign Up</button>
                </form>

                <img src="../facebookIcon.svg" alt="" />
                
                
                
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
                  Do you have an account?
                  <Link to='/sign-in'>
                  <br />
                  <a className="text-white-50 fw-bold">Login</a>
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

export default SignUpForm;
