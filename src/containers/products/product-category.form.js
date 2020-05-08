import { Modal, Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { post } from 'libs/request'
import { api } from 'config'
import { useDispatch } from 'react-redux'
import { message } from 'actions/config'
const { Option } = Select;

const ProductCategoryForm = props => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [listCategory, setListCategory] = useState('');
    const [form] = Form.useForm();
    const productCategory = props.productCategory;

    useEffect( () => {
        form.setFieldsValue(productCategory);
        if(props.listCategory.length > 0) {
            setListCategory(props.listCategory.map(item => {
                return <Option key={item.id} value={item.id}>{item.name}</Option>
            }))
        }
    },[productCategory]);

    const handleOk = (value) => {
        setLoading(true);
        setTimeout(async () => {
            const createOrUpdate = post(value.id !== undefined ? api.product_cate_update : api.product_cate_create, value);
            createOrUpdate.then(res => {
                dispatch(message({type:'success', message: res.message}))
                props.getCategory()
            }).catch(ex => {
                dispatch(message({type:'error', message: ex.message}))
            })
            props.setVisible(false)
            setLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        props.setVisible(false)
    };

    return <>
        <Modal forceRender visible={props.visible}
            title={productCategory.id != null ? productCategory.name : 'Tạo mới danh mục'}
            onOk={handleOk} footer="" onCancel={handleCancel} >
            <Form form={form} name="horizontal_login" layout="vertical" onFinish={handleOk}>
                <Form.Item name="name" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]} >
                    <Input placeholder="Tên danh mục" />
                </Form.Item>
                <Form.Item name="title" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]} >
                    <Input placeholder="Tiêu đề" />
                </Form.Item>
                <Form.Item name="desc">
                    <Input.TextArea placeholder="Mô tả" />
                </Form.Item>
                <Form.Item name="parent_id" label="Danh mục">
                    <Select
                        value={productCategory.parentId || 0}
                        placeholder="Chọn danh mục"
                        allowClear>
                        {listCategory}
                    </Select>
                </Form.Item>
                <Form.Item name="status" label="Trạng thái">
                    <Select
                        placeholder="- Chọn trạng thái"
                        value={productCategory.status || 0}
                        allowClear>
                        <Option value={0}>Ngưng</Option>
                        <Option value={1}>Kích hoạt</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit">
                        {productCategory.id == null ? 'Tạo mới' : 'Cập nhật'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
}

ProductCategoryForm.propTypes ={
    visible: PropTypes.bool,
    setVisible: PropTypes.func.isRequired,
    getCategory: PropTypes.func.isRequired,
    productCategory: PropTypes.object,
    listCategory: PropTypes.array.isRequired
}

ProductCategoryForm.defaultProps = {
    visible: false,
    productCategory: {},
    listCategory:[]
}

export default ProductCategoryForm;
