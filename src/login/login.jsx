import { Button, Checkbox, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux'
import { setToken } from '@/store/slices/common'
import { useState } from 'react';
import { goto } from '@/api/request';
import cryptoJs from 'crypto-js';
import titleLogo from '@/common/images/login/title_logo.png';
import {
  LoginService_login,
  // UserManagerService_checkPassword,
  // UserManagerService_checkIfOnline,
  // UserManagerService_resetPwdBySelf,
  // UserManagerService_checkDeadline
} from "@/api/index.js";
import './login.less'



const LoginForm = () => {
  const dispatch = useDispatch()

  const [messageApi, contextHolder] = message.useMessage();

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const error = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };

  const login = () => {
    const key = cryptoJs.enc.Utf8.parse('SunmrmsService01')
    const code = cryptoJs.enc.Utf8.parse(password)
    const secret = cryptoJs.AES.encrypt(code, key, { mode: cryptoJs.mode.ECB, padding: cryptoJs.pad.Pkcs7 }).toString()
    const params = {
      userName: userName,
      password: secret
    }
    LoginService_login(params).then(res => {
      if(res.success){
        dispatch(setToken(res.data.loginToken))
        goto('/home')
      }else{
        error(res.msg)
      }
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      {contextHolder}
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
          <Input value={userName} onChange={(e) => { setUserName(e.target.value) }} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} onClick={() => { login() }}>
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