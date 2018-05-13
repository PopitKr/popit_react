import React, { Component } from 'react'
import { routes } from './routes'
import { Route, Switch } from 'react-router-dom'
import NoMatch from './NoMatch'
import MobileDetect from 'mobile-detect';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          {routes.map(({ path, exact, component: Component, ...rest }) => (
            <Route key={path} path={path} exact={exact} render={(props) => (
              <Component isMobile={this.props.isMobile} {...props} {...rest} />
            )} />
          ))}
          <Route render={(props) => <NoMatch {...props} /> } />
        </Switch>
      </div>
    )
  }
}

export default App