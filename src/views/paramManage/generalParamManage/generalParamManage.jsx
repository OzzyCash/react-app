import { Card, Button, Form, Input, Table, Tag, Space, Tooltip } from 'antd'
import { useEffect, useState } from 'react';
import './index.less'
import { CodeManagerService_queryPage } from '@/api/index.js'

function generalParamManage() {
  const [cdType, setCdType] = useState('')
  const [cdTypeDesc, setCdTypeDesc] = useState('')
  const [data, setData] = useState([])
  const columns = [
    { title: '代码类型编号', dataIndex: 'cdType', key: 'cdType', align: 'center', width: 150,
      ellipsis: { showTitle: false, },
      render: (cdType) => (
        <Tooltip placement="bottom" title={cdType}> {cdType} </Tooltip>
      ),
    },
    { title: '代码类型描述', dataIndex: 'cdTypeDesc', key: 'cdTypeDesc', align: 'center', },
    { title: '代码值', dataIndex: 'cdValue', key: 'cdValue',align: 'center' , },
    { title: '代码描述', dataIndex: 'cdDes', key: 'cdDes', align: 'center', },
    { title: '备注', dataIndex: 'remarks', key: 'remarks', align: 'center', },
    { title: '数据来源', dataIndex: 'dataSrc', key: 'dataSrc', align: 'center', },
    { title: '源系统代码值', dataIndex: 'srcAttrId', key: 'srcAttrId', align: 'center', },
    { title: '源系统代码描述', dataIndex: 'srcAttrName', key: 'srcAttrName', align: 'center', },
  ];
  useEffect(()=> {
    let params = {
      cdTypeDesc: "",
      cdType: "",
      cdValue:"",
      cdDes: "",
      limit: 0,
      start: 0
    }
    CodeManagerService_queryPage(params).then(res => {
      setData(res.data.rows)
    })
  },[])
  return (
    <div className="index">
      <Card>
        <div className="btn-box clearfix">
          <Button type="primary">新增</Button>
          <Button type="primary">删除</Button>
          <Button type="primary" className='fr'>导出模板</Button>
          <Button type="primary" className='fr'>导出</Button>
          <Button type="primary" className='fr'>导入</Button>
        </div>
        <div className="body">
          <Form
            name="query"
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 16 }}
            // style={{ maxWidth: 600, marginTop: 50 }}
            // initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            // autoComplete="off"
          >
            <div className="inline-form">
              <Form.Item label="代码类型编号" name="cdType" >
                <Input value={cdType} onChange={(e) => { setCdType(e.target.value) }} />
              </Form.Item>
              <Form.Item label="代码类型描述" name="cdTypeDesc" >
                <Input value={cdTypeDesc} onChange={(e) => { setCdTypeDesc(e.target.value) }} />
              </Form.Item>
            </div>
            <Table columns={columns} dataSource={data}  scroll={{y: 620}}/>
          </Form>
        </div>
      </Card>
    </div>
  )
}

export default generalParamManage