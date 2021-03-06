import { Row, Col, Input, Upload, Select, Form, Button } from 'antd'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import CKEditor from "react-ckeditor-component";
import { useCallback, useEffect, useMemo, useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import { fetch, post } from 'libs/request'
import { gateway, api, SUCCESS } from 'config'
import { useDispatch } from 'react-redux'
import { message } from 'actions/config'
import axios from 'axios'
import dynamic from 'next/dynamic'

const { Dragger } = Upload;
const { Option } = Select;
const sectionId = Math.floor(Date.now() / 1000);
const EditorClient = dynamic(() => import("components/editor"), {
    ssr: false
});

const FaqForm =  props => {

    const infoUploads = {
        sessionId: sectionId,
        id: props.faqs.id !== undefined ? props.faqs.id: 0
    };

    const [faqs] = useState(props.faqs);
    const [listImage, setListImage] = useState([]);
    const [form] = Form.useForm();
    const [content, setContent] = useState('');
    const [listCategory, setListCategory] = useState('');

    const dispatch = useDispatch();
    const onFinish = values => {
        const data = {
            ...values, id: faqs.id,
            content: content,
        }
        post(props.mode == 'update' ? api.faqs_update : api.faqs_create + '?sectionId=' + infoUploads.sessionId, data).then(res => {
            if(res.errorCode === SUCCESS) {
                dispatch(message({type:'success', message: res.message}))
            }
        }).catch(error => {
            dispatch(message({type:'error', message: error.message}))
        })
    };

    useEffect(() => {
        form.setFieldsValue(faqs);
        setContent(faqs.content);
        if(props.mode == 'update') {
            setListImage(faqs.tagsImage != null ? faqs.tagsImage : [])
        }
        fetch(api.page_mix_cate).then(res => {
            if(res.errorCode === SUCCESS) {
                if(res.data.length > 0)
                setListCategory(res.data.map(item => {
                    return <Option key={item.id} value={item.id}>{item.name}</Option>
                }))
            }
        })
    }, []);

    const propsUploads = {
        name: 'file',
        multiple: true,
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
                if(rec.errorCode === SUCCESS) {
                    setListImage(listImage.concat(rec.data));
                    dispatch(message({type:'success', message: 'file uploaded successfully.'}))
                } else {
                    dispatch(message({type:'success', message: rec.message}))
                }
                options.onSuccess(res.data, options.file)
            }).catch((err) => {
                dispatch(message({type:'error', message: `${err.message} file upload failed.`}))
            })
        },
        action: gateway + '/media/uploads?object=tags&sectionId=' + infoUploads.sessionId + '&objectId=' + infoUploads.id
    };

    const removeImage = useCallback( (image) => {
        fetch(api.media_delete_image, {id:image.id}).then(res => {
            let tmp = listImage.filter(item => {
                return item.id !== image.id;
            });
            setListImage(tmp);
            dispatch(message({type:'success', message: res.message}))
        })
    });

    const memoListImage = useMemo( () => {
        if(!listImage || listImage.length <= 0)
            return null;
        return listImage.map(it => {
            return (
                <Row key={it.id} style={{borderBottom: '1px solid #ccc', marginTop:5}}>
                    <Col key={it.id} style={{height:70}} flex="100px">
                        <img style={{width:70, height:70}} src={it.imageUrl}/>
                    </Col>
                    <Col key={it.imageUrl} flex="auto">
                        <Row justify="space-around" align="middle" style={{height:70}}>
                            <Button onClick={() => {window.open(it.imageUrl, '_ blank')}} type="primary" shape="round" icon={<EyeOutlined />} size={20} />
                            <Button onClick={() => removeImage(it)} type="primary" shape="round" icon={<DeleteOutlined />} size={20} />
                        </Row>
                    </Col>
                </Row>
            );
        })
    }, [listImage]);

    return <>
        <Form form={form} name="horizontal_login" layout="vertical" onFinish={onFinish}>
            <Row justify="space-around">
                <Col style={{ padding: 8 }} span={10}>
                    <Form.Item name="name"
                               rules={[{ required: true, message: 'Vui lòng nhập tên!' }]} >
                        <Input placeholder="Tên bài viết" />
                    </Form.Item>
                    <Form.Item
                        name="desc"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]} >
                        <Input.TextArea  placeholder="Mô tả" />
                    </Form.Item>
                    <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true }]}>
                        <Select
                            placeholder="Chọn danh mục của tin"
                            onChange={() => {}}
                            allowClear>
                            {listCategory}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Dragger {...propsUploads} >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        </Dragger>
                        <div style={{maxHeight:400,overflow: 'auto'}}>
                            {memoListImage}
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {props.mode == 'create' ? 'Tạo mới' : 'Cập nhật'}
                        </Button>
                    </Form.Item>
                </Col>
                <Col style={{ padding: 8 }} span={14}>
                    <EditorClient setContent={setContent} content={content}/>
                </Col>
            </Row>
        </Form>
    </>
}

FaqForm.defaultProps = {
    faqs: {},
    mode: 'create'
}

export default FaqForm;
