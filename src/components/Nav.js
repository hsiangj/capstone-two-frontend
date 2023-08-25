import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';

import UserContext from '../context/UserContext';

import './Nav.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';


function Navbar({logout, drawerWidth, handleDrawerToggle}) {
  const { currentUser } = useContext(UserContext);

  return (
    <AppBar
        component="nav"
        position="fixed"
        sx={{
          width: currentUser? { sm: `calc(100% - ${drawerWidth}px)` } : {},
          ml: currentUser? { sm: `${drawerWidth}px` } : {},
        }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}><Link to="/">ExpenseBud</Link></Typography>
        {currentUser
        ? (
          <Button color="inherit"><Link to="/" onClick={logout}>Logout</Link></Button>
          )
        : (<>
          <Button color="inherit"><NavLink to="/login">Login</NavLink></Button>
          <Button color="inherit"><NavLink to="/register">Register</NavLink></Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

