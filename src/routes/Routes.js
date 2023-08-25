import { Route, Switch, Redirect } from 'react-router-dom';

import RegisterForm from '../pages/login-register/RegisterForm';
import LoginForm from '../pages/login-register/LoginForm';
import Home from '../pages/home/Home';
import Dashboard from '../pages/dashboard/Dashboard';
import ProfileForm from '../pages/profile/ProfileForm';
import Main from '../components/Main';

function Routes({register, login}) {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/register">
        <RegisterForm register={register} />
      </Route>

      <Route exact path="/login">
        <LoginForm login={login} />
      </Route>

      <Route exact path="/dashboard">
        <Main>
        <Dashboard />
        </Main>
      </Route>

      <Route exact path="/profile">
        <Main>
        <ProfileForm />
        </Main>
      </Route>

      <Redirect to="/" />
    </Switch>
  )
}

export default Routes;