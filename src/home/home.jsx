import { Button } from 'antd'
import { goto } from '@/api'
import './home.less'

function Home() {
  return (
      <div className="home">
        <h1>Home Page</h1>
        <div className="ipt-con">
        <Button type="primary" onClick={() => { goto('/login') }}>返回登录</Button>
        </div>
      </div>
    )
}

export default Home
