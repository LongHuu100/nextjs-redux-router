import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { login } from 'actions/config';
import { useDispatch } from 'react-redux'

const LoginFormImpl = (props) => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const onFinish = values => {
        console.log('Received values of form: ', values);
        dispatch(login((values)));
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        form.setFieldsValue({
            username: 'devapi',
            password: '123456'
        });
    }, []);

    return (
        <div className="login__zone">
            <div className="logo__log">
                <img src="/static/logo.png"/>
            </div>
            <div className="ct__log">
                <h3>đăng nhập hệ thống</h3>
                <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item name="username" rules={[{ required: true, message:'Vui lòng nhập tên đăng nhập' }]}>
                        <Input type="text" placeholder="Tên đăng nhập"/>
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message:'Vui lòng nhập mật khẩu' }]}>
                        <Input type="password" placeholder="Mật khẩu"/>
                    </Form.Item>
                    <Form.Item>
                        <Button className="btn-login" type="primary" htmlType="submit">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginFormImpl;
