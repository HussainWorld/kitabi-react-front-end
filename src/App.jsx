import { useContext } from 'react';
import { Routes, Route } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';

import { UserContext } from './contexts/UserContext';

import { AdContextProvider } from "../src/contexts/adContext";
import CreateAd from './components/CreateAd/CreateAd';
import MyAds from './components/MyAds/MyAds';

import ViewAd from './components/ViewAd/ViewAd';

const App = () => {
  const { user } = useContext(UserContext);
  
  return (
    <>
    <AdContextProvider>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />

        <Route path='/my-ads' element={<MyAds />}></Route>
        <Route path='/my-ads/:adId' element={<ViewAd />}></Route>

        <Route path='/create-ad'
         element={
          <CreateAd />
          }>
        </Route>
      </Routes>
    </AdContextProvider>
    </>
  );
};

export default App;
