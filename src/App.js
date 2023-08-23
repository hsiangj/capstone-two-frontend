import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ExpenseBudApi from './api/api';
import useLocalStorage from './hooks/useLocalStorage';
import Routes from './routes/Routes';
import Navbar from './components/Navbar';

import Button from '@mui/material/Button';

function App() {
  const [token, setToken] = useLocalStorage("expensebud_token");

  async function register(registerData){
    try {
      let result = await ExpenseBudApi.register(registerData);
      setToken(result);
      return {success: true};
    } catch(err) {
      return {success: false, err};
    }
  }




  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes register={register}/>
    
      </BrowserRouter>
    </div>
  )  

}

export default App;
