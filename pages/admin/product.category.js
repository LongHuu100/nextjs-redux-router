import { Helmet } from 'react-helmet'
import {
    Row, Breadcrumb, Tag, Input,
    Select, Button, Form, Table, Popconfirm
} from 'antd'
import { DeleteOutlined, EditTwoTone } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react'
import { fetch, post } from 'libs/request'
import { api, SUCCESS } from 'config'
import ProductCategoryForm from 'containers/products/product-category.form'
import { useDispatch, useSelector } from 'react-redux'
import { message, listProductCategory } from 'actions'
const { Option } = Select;

const AdminProductCategory = props => {

    const dispatch = useDispatch();
    const { repos } = useSelector(state => state)
    const [form] = Form.useForm();
    const [filter, setFilter] = useState({});
    const [data, setData] = useState([]);
    const [productCategory, setProductCategory] = useState({});
    const [openModel, setOpenModel] = useState(false);

    const onFinish = values => {
        setFilter(values);
    };

    useEffect( () => {
        const listData = repos.get('productCategory').toJS();
        setData(listData)
    }, [repos.get('productCategory')])

    useEffect(() => {
        post(api.product_cate_list, filter).then(res => {
            if(res.errorCode === SUCCESS){
                setData(res.data)
            }
        })
    }, [filter])

    const deleteCallback = useCallback((id) => {
        fetch(api.product_cate_delete, {id:id}).then(res => {
            if(res.errorCode === SUCCESS){
                dispatch(listProductCategory())
                dispatch(message({type:'success', message: res.message}))
            }
        }).catch(ex => {
            dispatch(message({type:'error', message: ex.message}))
        })
    })

    const columns = [
        {
            title: 'Tên danh mục',
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
            title: 'Mô tả',
            dataIndex: 'desc',
            key: 'desc',
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
            title: 'Thao tác',
            key: 'action',
            render: (text, record) => {
                return <span>
                <a onClick={ async ()=> {
                    await setProductCategory(record)
                    setOpenModel(true)
                }} style={{ marginRight: 16 }}><EditTwoTone/></a>
                <Popconfirm title="Xóa danh mục sẽ xóa tất cả danh mục con ?" onConfirm={() => {deleteCallback(record.id)}}>
                    <a><DeleteOutlined/></a>
                </Popconfirm>
            </span>
            },
        }
    ];

    return (
        <>
            <Helmet>
                <title>Danh mục sản phẩm</title>
            </Helmet>
            <Row style={{ padding: 8 }} justify="start">
                <Breadcrumb>
                    <Breadcrumb.Item>Trang quản trị</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        danh sách danh mục sản phẩm
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row style={{ padding: 8 }} justify="start">
                <Form layout="inline" form={form} onFinish={onFinish}>
                    <Form.Item name="name">
                        <Input type="text" placeholder="Tên danh mục"/>
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
                    <Button onClick={ async ()=> {
                        await setProductCategory({})
                        setOpenModel(true)
                    }} type="success">Tạo mới</Button>
                </Form>
                <Table rowKey="id" style={{ width: '100%' }} columns={columns} dataSource={data} />
            </Row>
            <ProductCategoryForm
                getCategory={() => {dispatch(listProductCategory())}}
                listCategory={data}
                productCategory={productCategory}
                visible={openModel}
                setVisible={setOpenModel} />
        </>
    )
}

AdminProductCategory.getInitialProps = ({store, query}) => {
    store.dispatch(listProductCategory());
    return {data: []}
}

export default AdminProductCategory;
