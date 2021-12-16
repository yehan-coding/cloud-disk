import { Form, Input, Button } from 'antd'
import './index.scss'
import { login } from '@/api/index.js'

const Login = () => {

  const handleFinish = (value) => {
    const { username, password } = value
    handleLogin(username, password)
  }

  const handleLogin = async (username, password) => {
    const { data } = await login({ username, password })
    console.log(data)
  }

  const loginBox = () => (
    <Form
      className='login-form'
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={ handleFinish }
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  )

  return (
    <div className='login-page'>
      { loginBox() }
    </div>
  )
}

export default Login
