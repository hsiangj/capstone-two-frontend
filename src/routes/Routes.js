import { Route, Switch, Redirect } from 'react-router-dom';


import RegisterForm from '../pages/RegisterForm';


function Routes({register}) {
  return (
    <Switch>
      <Route exact path="/register">
        <RegisterForm register={register}/>
      </Route>

      <Route exact path="/login">
        
      </Route>

    </Switch>
  )
}

export default Routes;