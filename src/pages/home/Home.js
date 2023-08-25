import { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import UserContext from '../../context/UserContext';

import './Home.css';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function Home() {
  const {currentUser} = useContext(UserContext);

  return (
    <div className="Home">
      {currentUser
        ? <Redirect to='/dashboard' />

        : (<><Toolbar /> 
            <Grid container pl={4} className="Home-grid">
            <Grid item xs={12} md={6} >
              <Typography component="h1">
                      ExpenseBud
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography component="h3" variant="h5">
                      Personal expense tracking & budgeting made simple
              </Typography>
              <Typography component="h4" variant="h6">
                  <Link to='/register'>Register</Link> or&nbsp;  
                  <Link to='/login'>Login</Link> 
                  &nbsp;to get started. </Typography>
            </Grid>
            </Grid></>
          )
      }
    </div>
  )
}

export default Home;