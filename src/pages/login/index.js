import { useHistory } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import './index.scss'
import { login, info } from '@/api/index.js'
import { localStore } from '@/utils/StoreUtils'
import leftImg from '@/assets/login-left.png'

const Login = () => {

  const router = useHistory()

  const handleFinish = (value) => {
    const { username, password } = value
    if (!username && !password) {
      message.warning('请输入用户名和密码')
    } else {
      handleLogin(username, password)
    }
  }

  const handleLogin = async (username, password) => {
    const { data } = await login({ username, password })
    if (data) {
      localStore.setItem('token', data)
      fetchUserInfo()
    } else {
      message.warning('用户不存在')
    }
  }

  const fetchUserInfo = async () => {
    const { data } = await info()
    if (data) {
      message.success('登录成功')
      localStore.setItem('user', data)
      router.push('/')
    }
  }

  const loginBox = () => (
    <Form
      className='login-form'
      name="basic"
      initialValues={{ remember: true }}
      onFinish={ handleFinish }
      autoComplete="off"
    >
      <h1>登 录</h1>
      <Form.Item
        name="username"
      >
        <Input placeholder='用户名' />
      </Form.Item>

      <Form.Item
        name="password"
      >
        <Input.Password placeholder='密码' />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          登录
        </Button>
      </Form.Item>
    </Form>
  )

  return (
    <div className='login-page'>
      <div className='login-box'>
        <div className='login-left'>
          <img src={ leftImg } alt='' />
        </div>
        <div className='login-right'>
          { loginBox() }
        </div>
      </div>
    </div>
  )
}

export default Login
