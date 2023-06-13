import { Button, Checkbox, Form, Input } from 'antd';
import titleLogo from '@/common/images/login/title_logo.png';
import './login.less'



const LoginForm = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, marginTop: 50 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" style={{ width : '100%'}}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

const Login = () => {
  return (
    <>
    <div className="login">
      <div className='login-box'>
        <div className='login-left'></div>
        <div className='line'></div>
        <div className='login-right'>
          <img src={titleLogo} style={{ width: 185 , margin: "0 auto" }} alt=''/>
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login