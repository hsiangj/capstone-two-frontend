import { useContext } from 'react';

import UserContext from '../context/UserContext';

import './Footer.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 140;

function Footer() {
  const { currentUser } = useContext(UserContext);
  return (
    <AppBar position="fixed" color="primary" className="Footer" sx={{ 
      top: 'auto', 
      bottom: 0,
      width: currentUser? { sm: `calc(100% - ${drawerWidth}px)` } : {},
      ml: currentUser? { sm: `${drawerWidth}px` } : {},
      }}>
      <Toolbar>
        <Typography variant="body2" color="inherit">
          Developed by Jessica H. 2023
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
