import { Modal, Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { post } from 'libs/request'
import { api } from 'config'
import { useDispatch } from 'react-redux'
import { message } from 'actions/config'

const PageCategoryForm = props => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [listCategory, setListCategory] = useState('');
    const [form] = Form.useForm();
    const pageCategory = props.pageCategory;

    useEffect( () => {
        form.setFieldsValue(pageCategory);
        if(props.listCategory.length > 0) {
            setListCategory(props.listCategory.map(item => {
                return <Option key={item.id} value={item.id}>{item.name}</Option>
            }))
        }
    },[pageCategory]);

    const handleOk = (value) => {
        setLoading(true);
        setTimeout(async () => {
            const createOrUpdate = post(value.id !== undefined ? api.page_cate_update : api.page_cate_create, value);
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
        <Modal
            visible={props.visible}
            title={pageCategory.id != null ? pageCategory.name : 'Tạo mới danh mục'}
            onOk={handleOk}
            footer=""
            onCancel={handleCancel}
        >
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
                <Form.Item name="id" label="Danh mục" rules={[{ required: true }]}>
                    <Select
                        placeholder="Chọn danh mục"
                        allowClear>
                        {listCategory}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit">
                        {pageCategory.id == null ? 'Tạo mới' : 'Cập nhật'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
}

PageCategoryForm.propTypes ={
    visible: PropTypes.bool,
    setVisible: PropTypes.func.isRequired,
    getCategory: PropTypes.func.isRequired,
    pageCategory: PropTypes.object,
    listCategory: PropTypes.array.isRequired
}

PageCategoryForm.defaultProps = {
    visible: false,
    pageCategory: {},
    listCategory:[]
}

export default PageCategoryForm;
