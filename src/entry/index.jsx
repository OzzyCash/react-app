import { Outlet, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import Header from '@/components/header'
import './index.less'
import { MenuManagerService_currentUserMenu } from '@/api/index.js'



const items = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
];
const { Content, Sider } = Layout;

function Entry() {

  const location = useLocation()

  const [collapsed, setCollapsed] = useState(false);

  const [menuList, setMenuList] = useState([])


  // 请求封装
  const getList = () => {
    MenuManagerService_currentUserMenu().then(res => {
      console.log(res.data);
      setMenuList(res.data);
    })
  }

  // 请求列表数据  componentDidMount
  useEffect(() => {
    getList()
  })

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };


  return (
    <Layout style={{height:'100%'}}>
      <Header />
      <Content>
        <Layout style={{ height: '100%' }}>
          <Sider collapsible collapsed={collapsed} collapsedWidth="60" onCollapse={(value) => setCollapsed(value)}>
            <div className="top-icon-div">
              <a href="javascript:;" onClick={toggleCollapsed} className={collapsed ? 'top-icon menu-icon rotate-icon' : 'top-icon'}></a>
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuList} />
          </Sider>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Content>
    </Layout>
  )
}

export default Entry
