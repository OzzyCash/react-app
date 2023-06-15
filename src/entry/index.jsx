import { Outlet } from 'react-router-dom'
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import Header from '@/components/header'
import './index.less'


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
  const [collapsed, setCollapsed] = useState(false);
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
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
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
