import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { decodeToken } from 'react-jwt';

import ExpenseBudApi from './api/api';
import useLocalStorage from './hooks/useLocalStorage';
import Routes from './routes/Routes';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';


function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [userToken, setUserToken] = useLocalStorage("expensebud_token");
  const [currentUser, setCurrentUser] = useState(null);

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "userToken=", userToken,
  );

  useEffect(() => {
    console.debug("App useEffect load current user");
    
    async function getCurrentUser() {
      if (userToken) {
        try {
          ExpenseBudApi.token = userToken;
          let { id } = decodeToken(userToken);
          let currentUser = await ExpenseBudApi.getCurrentUser(id);
          setCurrentUser(currentUser);
        } catch (err) {
        console.error('Error loading current user', err);
        setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [userToken])

  async function register(registerData){
    try {
      let result = await ExpenseBudApi.register(registerData);
      setUserToken(result);
      return {success: true};
    } catch(err) {
      return {success: false, err};
    }
  }

  async function login(loginData){
    try {
      let token = await ExpenseBudApi.login(loginData);
      setUserToken(token);
      return {success: true};
    } catch(err) {
      return {success: false, err};
    }
  }

  if (!infoLoaded) return <LoadingSpinner />

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes register={register} login={login} />
    
      </BrowserRouter>
    </div>
  )  

}

export default App;
