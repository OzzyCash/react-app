import { Button, Tooltip, Dropdown, message } from 'antd'
import { UserOutlined, EditOutlined, OrderedListOutlined, LogoutOutlined } from '@ant-design/icons';
// import { goto } from '@/api'
import { ExitSvglined } from '@/components/extraIcons'
import headerLogo from '@/common/images/header/logo.png'
import { useNavigate } from 'react-router-dom'
import './index.less'


function Header() {
  const navigate = useNavigate()
  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };
  const items = [
    {
      label: '修改密码',
      key: '1',
      icon: <EditOutlined />,
    },
    {
      label: '系统手册',
      key: '2',
      icon: <OrderedListOutlined />,
    },
    {
      label: '退出登录',
      key: '3',
      icon: <LogoutOutlined />,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className="header-wrapper">
      <div className="logo-con">
        <img src={ headerLogo } alt="" />
      </div>
      <div className="opt-con">
        <Dropdown.Button menu={menuProps} icon={<UserOutlined />}>
          zhangshuhan
        </Dropdown.Button>
        <div className="exit-con">
          <Tooltip title="退出">
            <Button icon={<ExitSvglined />} shape="circle" onClick={() => { navigate('/login') }}></Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default Header