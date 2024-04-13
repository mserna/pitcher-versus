import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CircularLoader from './components/loader';
import { ThemeProvider } from '@material-ui/styles';

import { Home } from './views/home/home';
import { Dashboard } from './views/dashboard/dashboard';
import { PlayerProfile } from './views/profile/profile';

const App = () => {
    const [isLoading] = useState(false);

    // Load data
    // TODO: Needs to be adjusted using other year data
    useEffect(()=>{
        fetch('data_2020.json').then(response => {
            response.json().then(fileData => {
                localStorage.setItem("json_data", fileData);
            })
        })
    })

    return(
        <ThemeProvider>
            {isLoading ? <CircularLoader /> : null}
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route exact path="/home" component={ Home } />
                <Route exact path="/dashboard" component={ Dashboard } />
                <Route exact path="/profile/:id" component={ PlayerProfile } />
                <Redirect from="*" to="/" />
            </Switch>
        </ThemeProvider>
    );
};
  
export default App;