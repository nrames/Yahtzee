import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import Game from './components/Game';
import Scores from './components/Scores';
import { Route, Switch } from 'react-router-dom';
import { 
  login, 
  register, 
  logout, 
  validateToken,
} from './actions/user';
import { 
  ProtectedRoute,
  Login,
  Register,
  FetchUser,
  NavBar,
} from '@devpoint/dps-react-kit';

const authRoutes = [
  { url: '/scores', text: 'Scores' },
]

const App = () => (
  <div>
    <NavBar handleLogout={logout} authRoutes={authRoutes} />
    <FetchUser validateToken={validateToken}>
      <Switch>
        <ProtectedRoute exact path="/" component={Game} />
        <ProtectedRoute exact path="/scores" component={Scores} />
        <Route  
          exact
          path="/login"
          render={ props => <Login {...props} handleLogin={login} /> }
        />
        <Route
          exact
          path="/register"
          render={ props => <Register {...props} registerUser={register} /> }
        />
      </Switch>
    </FetchUser>
  </div>
)

export default App;