import React from 'react';
import { Route, Switch } from 'react-router';

import Home from '../components/Home';
import App from '../containers/App';

const Routes = (props) => {
  return (
    <App>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route path={"/preferences"} component={Home} />
        <Route render={(props) => <div>{console.log(props)}404 - Not Found</div>} />
      </Switch>

    </App>
  )
}

export default Routes
