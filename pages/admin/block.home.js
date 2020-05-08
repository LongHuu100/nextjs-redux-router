import { Helmet } from 'react-helmet'
import {
    Row, Breadcrumb, Tag, Input,
    Select, Button, Form, Table, Popconfirm
} from 'antd'
import { DeleteOutlined, EditTwoTone } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react'
import { fetch, post } from 'libs/request'
import { api, SUCCESS } from 'config'
import HomeBlockForm from 'containers/home-block.form'
import { useDispatch } from 'react-redux'
import { message, listCategory } from 'actions'

const { Option } = Select;
const actionBlockHome = {
    list: '/list',
    view: '/view',
    create: '/create',
    update: '/update',
    delete: '/delete'
}

const AdminBlockHome = props => {

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [filter, setFilter] = useState({});
    const [reload, setReload] = useState(false);
    const [data, setData] = useState([]);
    const [blockHome, setBlockHome] = useState(null);
    const [openModel, setOpenModel] = useState(false);

    const onFinish = values => {
        setFilter(values);
    };

    useEffect(() => {
        post(api.block_home + actionBlockHome.list, filter).then(res => {
            if(res.errorCode === SUCCESS){
                setData(res.data)
            }
        })
    }, [filter, reload])

    const deleteCallback = useCallback((id) => {
        fetch(api.block_home + actionBlockHome.delete, {id:id}).then(res => {
            if(res.errorCode === SUCCESS){
                dispatch(listCategory())
                dispatch(message({type:'success', message: res.message}))
            }
        }).catch(ex => {
            dispatch(message({type:'error', message: ex.message}))
        })
    })

    const columns = [
        {
            title: 'Name block',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Date',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: status => {
                let color = status == 0 ? 'green' : 'geekblue';
                return (
                    <Tag color={color}>
                        { status == 0 ? 'Active' : 'Deactive'}
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                return <span>
                    <a onClick={ async ()=> {
                        await setBlockHome(record)
                        setOpenModel(true)
                    }} style={{ marginRight: 16 }}><EditTwoTone/></a>
                    <Popconfirm title="are you sure ?" onConfirm={() => {deleteCallback(record.id)}}>
                        <a><DeleteOutlined/></a>
                    </Popconfirm>
                </span>
            }
        }
    ];

    return (
        <>
            <Helmet>
                <title>Home block manager</title>
            </Helmet>
            <Row style={{ padding: 8 }} justify="start">
                <Breadcrumb>
                    <Breadcrumb.Item>Admin page</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        List block home
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row style={{ padding: 8 }} justify="start">
                <Form layout="inline" form={form} onFinish={onFinish}>
                    <Form.Item name="name">
                        <Input type="text" placeholder="Category name"/>
                    </Form.Item>
                    <Form.Item name="status">
                        <Select placeholder="- Status choise -">
                            <Option value="0">Active</Option>
                            <Option value="1">Deactive</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit"> Search </Button>
                    </Form.Item>
                    <Button onClick={ async ()=> {
                        await setBlockHome({})
                        setOpenModel(true)
                    }} type="success">Create block</Button>
                </Form>
                <Table rowKey="id" style={{ width: '100%' }} columns={columns} dataSource={data} />
            </Row>
            <HomeBlockForm
                actionBlockHome={actionBlockHome}
                setReload={setReload}
                listCategory={props.pageProps.listCategory}
                blockHome={blockHome}
                visible={openModel}
                setVisible={setOpenModel} />
        </>
    )
}

AdminBlockHome.getInitialProps = async ({store, query}) => {
    const cateProduct = await fetch(api.product_cate_list);
    return {listCategory: cateProduct.errorCode == SUCCESS ? cateProduct.data : [] }
}

export default AdminBlockHome;
