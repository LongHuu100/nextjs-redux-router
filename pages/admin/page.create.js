import Helmet from 'react-helmet'
import { Row, Col, Form, Input, Button, Breadcrumb } from 'antd';
import CKEditor from "react-ckeditor-component";
import { useCallback, useState } from 'react'

const AdminPage =  props => {

    const [form] = Form.useForm();
    const [content, setContent] = useState('');
    const onFinish = values => {
        console.log('Finish:', values);
    };

    const callbackContent = useCallback(( evt ) => {
        var newContent = evt.editor.getData();
        setContent(newContent);
    })

    return (
        <>
            <Helmet>
                <title>Quản lý tin tức</title>
            </Helmet>
            <Row style={{ padding: 8 }} justify="start">
                <Breadcrumb>
                    <Breadcrumb.Item>Trang quản trị</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">Tin tức</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Tạo mới
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Form form={form} name="horizontal_login" layout="group" onFinish={onFinish}>
                <Row justify="space-around">
                    <Col style={{ padding: 8 }} span={12}>
                        <Form.Item
                            name="title"
                            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]} >
                            <Input placeholder="Tiêu đề" />
                        </Form.Item>
                        <Form.Item name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]} >
                            <Input placeholder="Tên bài viết" />
                        </Form.Item>
                        <Form.Item
                            name="desc"
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]} >
                            <Input.TextArea  placeholder="Mô tả" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Tạo mới
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col style={{ padding: 8 }} span={12}>
                        <CKEditor
                            config= {{ language: 'vn',height:500 }}
                            activeClass="p10"
                            content={content}
                            events={{
                                "change": callbackContent
                            }}
                        />
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default AdminPage;
