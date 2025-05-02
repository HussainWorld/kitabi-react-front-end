import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

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
    const isPasswordInvalid = !password || password.length < 6;
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
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='name'
            value={username}
            name='username'
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            name='email'
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor='phone'>Phone Number:</label>
          <input
            type='text'
            id='phone'
            value={phone}
            name='phone'
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor='birthDate'>Date of Birth:</label>
          <input
            type='date'
            id='birthDate'
            value={birthDate}
            name='birthDate'
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor='gender'>Gender:</label>
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

        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='confirm'>Confirm Password:</label>
          <input
            type='password'
            id='confirm'
            value={passwordConf}
            name='passwordConf'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <button onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;
