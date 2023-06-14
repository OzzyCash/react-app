import { Button, Card } from 'antd'
import { ThemeOutlined } from '@/components/extraIcons'
import './index.less'

function Header() {
  return (
    <Card className="M-header">
      <div className="header-wrapper">
        <div className="logo-con">Header</div>
        <div className="opt-con">
          <Button icon={<ThemeOutlined />} shape="circle"></Button>
        </div>
      </div>
    </Card>
  )
}

export default Header