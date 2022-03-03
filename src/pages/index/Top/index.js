import { Layout } from 'antd'
import { useHistory } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons'
import Logo from './Logo'
import BreadPath from './BreadPath'
import OptionBtn from './OptionBtn'
import { localStore } from '@/utils/StoreUtils'


const Top = (props) => {

  const { prefix, updatePrefix, updateTable } = props
  const router = useHistory() // 路由

  const logout = () => { // 推出登录
    localStore.removeItem('user')
    localStore.removeItem('token')
    router.replace('/login')
  }

  return (
    <Layout.Header className="index-header">
      <Logo />
      <BreadPath prefix={ prefix } updatePrefix={ updatePrefix } />
      <OptionBtn updateTable={ updateTable } prefix={ prefix } />
      <div className='logout'>
        <LogoutOutlined onClick={ () => logout() } />
      </div>
    </Layout.Header>
  )
}

export default Top
