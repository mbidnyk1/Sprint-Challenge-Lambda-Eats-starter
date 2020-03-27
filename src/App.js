import React from "react";
import {Route, Switch, NavLink} from 'react-router-dom';
import HomePage from './/components/HomePage';
import Form from './components/Form';

const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <NavLink to='/'>Home</NavLink>
        <Switch>
          <Route path='/pizza'>
            <Form />
          </Route>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
    </>
  );
};
export default App;
