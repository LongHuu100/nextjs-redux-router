import { Helmet } from 'react-helmet'
import {
    Row, Breadcrumb, Tag, Input,
    Select, Button, Form, Table, Popconfirm
} from 'antd';
import { DeleteOutlined, EditTwoTone } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { fetch, post } from 'libs/request'
import { api, SUCCESS } from 'config'
import { filterCateInList } from 'utils'
import Link from 'next/link'
const { Option } = Select;

const AdminTags = props => {

    const [form] = Form.useForm();
    const [filter, setFilter] = useState({});
    const [data, setData] = useState([]);
    const [catagorys, setCatagorys] = useState(null);

    const onFinish = values => {
        setFilter(values);
    };

    const columns = [
        {
            title: 'Tên tag',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            width: 300
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category'
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
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (text, record) => {
                return <span>
                    <Link href={`/admin/tags.update?id=${record.id}`}><a style={{ marginRight: 16 }}><EditTwoTone/></a></Link>
                    <Popconfirm title="Sure to delete?" onConfirm={() => {}}>
                        <a><DeleteOutlined/></a>
                    </Popconfirm>
                </span>
            },
        }
    ];

    useEffect(() => {
        ( async () => {
            let listInsideTags = null;
            if(catagorys == null) {
                const cates = await fetch(api.page_mix_cate);
                if(cates.errorCode === SUCCESS) {
                    setCatagorys(cates.data);
                    listInsideTags = cates.data;
                }
            } else {
                listInsideTags = catagorys;
            }
            const listTags = await post(api.tags_list, filter);
            if(listTags.errorCode === SUCCESS){
                let datas = listTags.data.embedded;
                datas.map(it => {
                    it.category = listInsideTags === null ? '--' : filterCateInList(it.categoryId, listInsideTags)
                    return it;
                })
                setData(datas);
            }
        })()
    }, [filter])

    return (
        <>
            <Helmet>
                <title>Quản lý tags</title>
            </Helmet>
            <Row style={{ padding: 8 }} justify="start">
                <Breadcrumb>
                    <Breadcrumb.Item>Trang quản trị</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link href="/admin/tags"><a>Tags</a></Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        danh sách tags
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row style={{ padding: 8 }} justify="start">
                <Form layout="inline" form={form} onFinish={onFinish}>
                    <Form.Item name="name">
                        <Input type="text" placeholder="Tên tags"/>
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
                    <Button type="success"><Link href="/admin/tags.create"><a>Tạo mới</a></Link></Button>
                </Form>
                <Table rowKey="id" style={{ width: '100%' }} columns={columns} dataSource={data} />
            </Row>
        </>
    )
}

export default AdminTags;
