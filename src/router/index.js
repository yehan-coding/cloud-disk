import { BrowserRouter as Router, Route } from 'react-router-dom'
import AuthRoute from './auth'
import routes from './route.config'

const RouterView = () => {

  return (
    <Router>
      {
        routes.map((item) => {
          return item.path === '/login'
          ? <Route key={ item.path } {...item}>
              <item.component />
            </Route>
          : <AuthRoute key={ item.path } {...item}>
              <item.component />
            </AuthRoute>
        })
      }
    </Router>
  )
}

export default RouterView
