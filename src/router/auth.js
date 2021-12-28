import { Route, Redirect } from 'react-router-dom'
import { localStore } from '@/utils/StoreUtils'

const AuthRoute = (props) => {

  return (
    <Route
      path={props.path}
      render={() => {
        const token = localStore.getItem('token')
        return token ? <props.component /> : <Redirect to='/login' />
      }}
    />
  )
}

export default AuthRoute
