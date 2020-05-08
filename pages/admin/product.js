import { Helmet } from 'react-helmet'
import {
    Row, Breadcrumb, Tag, Input,
    Select, Button, Form, Table
} from 'antd';
import { DeleteOutlined, EditTwoTone } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { post } from 'libs/request'
import { api, SUCCESS } from 'config'
import Link from 'next/link'
const { Option } = Select;

const AdminProduct = props => {

    const [form] = Form.useForm();
    const [filter, setFilter] = useState({});
    const [data, setData] = useState([]);

    const onFinish = values => {
        console.log('Finish:', values);
        setFilter(values);
    };

    useEffect(() => {
        post(api.product_list, filter).then(res => {
            if(res.errorCode === SUCCESS){
                setData(res.data.embedded)
            }
        })
    }, [filter])

    return (
        <>
            <Helmet>
                <title>Quản lý sản phẩm</title>
            </Helmet>
            <Row style={{ padding: 8 }} justify="start">
                <Breadcrumb>
                    <Breadcrumb.Item>Trang quản trị</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link href="/admin/product"><a>Sản phẩm</a></Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        danh sách sản phẩm
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row style={{ padding: 8 }} justify="start">
                <Form layout="inline" form={form} onFinish={onFinish}>
                    <Form.Item name="name">
                        <Input type="text" placeholder="Tên bài"/>
                    </Form.Item>
                    <Form.Item name="status">
                        <Select placeholder="- Chọn trạng thái -">
                            <Option value="0">Ngưng</Option>
                            <Option value="1">Kích hoạt</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit"> Tìm kiếm </Button>
                    </Form.Item>
                    <Button type="success"><Link href="/admin/product.form?mode=create&id=0"><a>Tạo mới</a></Link></Button>
                </Form>
                <Table rowKey="id" style={{ width: '100%' }} columns={columns} dataSource={data} />
            </Row>
        </>
    )
}

const columns = [
    {
        title: 'Hình ảnh',
        dataIndex: 'urlImage',
        key: 'urlImage',
        render: img => img == null ? '--' : <img src={img} style={{width:70, height:70}}/>,
    },
    {
        title: 'Tên bài',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Tiêu đề',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
        render: status => {
            let color = status == 0 ? 'green' : 'geekblue';
            return (
                <Tag color={color}>
                    { status == 0 ? 'Ngưng' : 'Kích hoạt'}
                </Tag>
            );
        },
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'Thao tác',
        key: 'action',
        render: (text, record) => {
            let linkEdit = "/admin/product.form?mode=edit&id=" + record.id;
            return <span>
                <Link href={linkEdit}>
                    <a style={{ marginRight: 16 }}><EditTwoTone/></a>
                </Link>
                <a><DeleteOutlined/></a>
            </span>
        },
    }
];

export default AdminProduct;
