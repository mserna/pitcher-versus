import React, { useState } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import CircularLoader from './components/loader';

import { Home } from './views/home/home';
import { Dashboard } from './views/dashboard/dashboard';
import PlayerProfile from './views/profile/profile';

const AppRoutes = () => {

  const [isLoading] = useState(false);
  
  return (
    <div>
      {isLoading ? <CircularLoader /> : null}
      <Router>
        <Switch>
          <Route path="/" exact component={ Home } />
          <Route path="/home" exact component={ Home } />
          <Route path="/dashboard" exact component={ Dashboard } />
          <Route path="/profile/:id" exact component={ PlayerProfile } />
        </Switch>
      </Router>
    </div>
    );
};
  
  export default AppRoutes;