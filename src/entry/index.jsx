import { Outlet, useNavigate } from 'react-router-dom'
import { PrivateRoute } from '@/router'
import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import Header from '@/components/header'
import './index.less'
import { MenuManagerService_currentUserMenu } from '@/api/index.js'

const { Content, Sider } = Layout;

function Entry() {

  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(false);

  const [menuList, setMenuList] = useState([])

  const handleMenu = (data) => {
    let result = [];
    for(let i = 0, len = data.length; i < len; i++){
      let item = {};
      item = {
        label: data[i].name,
        key: data[i].id,
        url: data[i].url,
        type: data[i].type,
      }
      if (data[i].type === 'module'){
        item.icon = <AppstoreOutlined />
      }else{
        item.icon = null;
      }
      if (data[i].submenu && data[i].submenu.length > 0) {
        item.children = handleMenu(data[i].submenu);
      } else {
        item.children = null;
      }
      result.push(item);
    }
    return result;
  }

  // 请求封装
  const getList = () => {
    MenuManagerService_currentUserMenu().then(res => {
      // console.log(res.data);
      let data = handleMenu(res.data)
      setMenuList(data);
    })
  }
  

  // 请求列表数据  componentDidMount
  useEffect(() => {
    getList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onClick = (e) => {
    navigate(e.item.props.url)
  }


  return (
    <PrivateRoute>
      <Layout style={{ height: '100%' }}>
        <Header />
        <Content>
          <Layout style={{ height: '100%' }}>
            <Sider collapsible collapsed={collapsed} collapsedWidth="60" onCollapse={(value) => setCollapsed(value)}>
              <div className="top-icon-div">
                <a href="javascript:;" onClick={toggleCollapsed} className={collapsed ? 'top-icon menu-icon rotate-icon' : 'top-icon'}></a>
              </div>
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuList} onClick={onClick} />
            </Sider>
            <Content>
              <Outlet />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </PrivateRoute>
  )
}

export default Entry
