import { Route, Switch, Redirect } from 'react-router-dom';


import RegisterForm from '../pages/login-register/RegisterForm';
import LoginForm from '../pages/login-register/LoginForm';

function Routes({register, login}) {
  return (
    <Switch>
      <Route exact path="/register">
        <RegisterForm register={register} />
      </Route>

      <Route exact path="/login">
        <LoginForm login={login} />
      </Route>

    </Switch>
  )
}

export default Routes;