import { Modal, Button, Form, message, Divider, Upload, Input, Select } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { post } from 'libs/request'
import { api, gateway, SUCCESS } from 'config'
import axios from 'axios'
const { Option } = Select;

const HomeBlockForm = props => {

    const [loading, setLoading] = useState(false);
    const [defaultFileList, setDefaultFileList] = useState(null);
    const [form] = Form.useForm();

    useEffect( () => {
        let blockHome = props.blockHome != null ? props.blockHome : {};
        if(blockHome.image != null) {
            const decodeImgs = JSON.parse(blockHome.image);
            setDefaultFileList(decodeImgs.map(item => {
                return {
                    uid: Math.floor(Math.random() * 6) + 1,
                    name: item,
                    status: 'done',
                    url: gateway + '/uploads/block/' + item,
                }
            }))
        }
        if(blockHome.url != null) {
            const urlops = JSON.parse(blockHome.url);
            blockHome.url_string = urlops.url_string;
            blockHome.category_id = urlops.category_id;
        }
        form.setFieldsValue(blockHome);
    },[props.blockHome]);

    const handleOk = (value) => {
        setLoading(true);
        setTimeout(async () => {
            const createOrUpdate = post(value.id !== undefined ? api.block_home + props.actionBlockHome.update :
                api.block_home + props.actionBlockHome.create, value);
            createOrUpdate.then(res => {
                message.success(res.message);
                props.setReload()
            }).catch(ex => {
                message.success(ex.message);
            })
            props.setVisible(false)
            setLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        props.setVisible(false)
    };

    const propsUploads = {
        name: 'file',
        customRequest: (options) => {
            const data= new FormData()
            data.append('file', options.file)
            const config= {
                "headers": {
                    "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
                }
            }
            axios.post(options.action, data, config).then((res) => {
                const rec = res.data;
                if(rec.errorCode == SUCCESS) {
                    message.success('file uploaded successfully.')
                }
                options.onSuccess(res.data, options.file)
            }).catch((err) => {
                message.error(err.message);
            })
        },
        action: gateway + '/' + api.block_home + '/uploads',
        defaultFileList: defaultFileList
    };

    return <>
        <Modal visible={props.visible}
            title={props.blockHome != null ? props.blockHome.name : 'Create new block'}
            onOk={handleOk} footer="" onCancel={handleCancel}>
            <Form form={form} name="horizontal_login" layout="vertical" onFinish={handleOk}>
                <Form.Item name="name" rules={[{ required: true, message: 'Please input your name category !' }]} >
                    <Input placeholder="name category" />
                </Form.Item>
                <Form.Item name="title" rules={[{ required: true, message: 'Please input your title!' }]} >
                    <Input placeholder="Title" />
                </Form.Item>
                <Form.Item name="desc">
                    <Input.TextArea placeholder="Description" />
                </Form.Item>
                <Upload {...propsUploads}>
                    <Button>
                        <UploadOutlined /> Uploads images
                    </Button>
                </Upload>
                <Divider orientation="left" plain> Link </Divider>
                <Form.Item style={{marginTop:10}}  name="category_id">
                    <Select
                        placeholder="Category select"
                        allowClear>
                        { props.listCategory.length > 0 &&
                            props.listCategory.map(item => {
                                return <Option key={item.id} value={item.id}>{item.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item name="url_string" rules={[{ required: true, message: 'Please input your title!' }]} >
                    <Input placeholder="Href" />
                </Form.Item>

                <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit">
                        {props.blockHome == null ? 'create new' : 'update'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
}

HomeBlockForm.propTypes ={
    visible: PropTypes.bool,
    setVisible: PropTypes.func.isRequired,
    setReload: PropTypes.func.isRequired,
    blockHome: PropTypes.object,
    listCategory: PropTypes.array.isRequired,
    actionBlockHome: PropTypes.object.isRequired
}

HomeBlockForm.defaultProps = {
    visible: false,
    blockHome: null,
    listCategory:[]
}

export default HomeBlockForm;
