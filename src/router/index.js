import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import routes from './route.config'

const RouterView = () => {
  return (
    <Router>
      <Switch>
        {
          routes.map(item =>
            <Route path={ item.path } key={ item.path }>
              <item.component />
            </Route>
          )
        }
      </Switch>
    </Router>
  )
}

export default RouterView
