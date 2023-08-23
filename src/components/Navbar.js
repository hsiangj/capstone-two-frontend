import { NavLink } from 'react-router-dom';

import './Navbar.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function Navbar() {
  return (
    <AppBar component="nav" position="static" className="">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>ExpenseBud</Typography>
        <Button color="inherit"><NavLink to="/login">Login</NavLink></Button>
        <Button color="inherit"><NavLink to="/register">Register</NavLink></Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

