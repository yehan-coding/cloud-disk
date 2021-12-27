import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import routes from './route.config'

const RouterView = () => {
  const token = localStorage.getItem('token')
  return (
    <Router>
      {
        routes.map(item =>
          <Route key={ item.path } {...item}>
            { (item.path === '/login' || token) ? <item.component /> : <Redirect to="/login" /> }
          </Route>
        )
      }
    </Router>
  )
}

export default RouterView
