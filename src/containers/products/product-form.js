import { Row, Col, Input, Upload, Checkbox, Select, Form, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import CKEditor from "react-ckeditor-component";
import { useCallback, useEffect, useMemo, useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import { fetch, post } from 'libs/request'
import { gateway, api, SUCCESS } from 'config'
import { useDispatch } from 'react-redux'
import { message } from 'actions/config'
import axios from 'axios'

import Tags from 'containers/page/tags'
const { Dragger } = Upload;
const { Option } = Select;

const getIdOfTags = (listTags) => {
    if(listTags.length <= 0)
        return null;
    let ids = [];
    listTags.map(it => {
        ids.push( parseInt(it.value) )
    });
    return JSON.stringify(ids);
}

const ProductForm =  props => {

    const infoUploads = {
        sessionId: Math.floor(Date.now() / 1000),
        id: props.product.id !== undefined ? props.product.id: 0
    };

    const [product] = useState(props.product);
    const [listImage, setListImage] = useState([]);
    const [listTags, setListTags] = useState([]);
    const [form] = Form.useForm();
    const [content, setContent] = useState('');
    const [listCategory, setListCategory] = useState('');

    const dispatch = useDispatch();
    const onFinish = values => {
        const data = {
            ...values, id: product.id,
            content: content,
            tags: getIdOfTags(listTags)
        }
        post(props.mode == 'update' ? api.product_update : api.product_create, data).then(res => {
            if(res.errorCode === SUCCESS) {
                dispatch(message({type:'success', message: res.message}))
            }
        }).catch(error => {
            dispatch(message({type:'error', message: error.message}))
        })
    };

    const callbackContent = useCallback(( evt ) => {
        var newContent = evt.editor.getData();
        setContent(newContent);
    })

    useEffect(() => {
        form.setFieldsValue(product);
        setContent(product.content);
        if(props.mode == 'edit') {
            setListImage(product.productImage)
        }
        fetch(api.product_cate_list).then(res => {
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
                if(rec.errorCode == SUCCESS) {
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
        action: gateway + '/product/uploads?sessionId=' + infoUploads.sessionId + '&id=' + infoUploads.id
    };

    const removeImage = useCallback( (image) => {
        fetch(api.product_delete_image, {id:image.id}).then(res => {
            let tmp = listImage.filter(item => {
                return item.id !== image.id;
            });
            setListImage(tmp);
            dispatch(message({type:'success', message: res.message}))
        })
    });

    const updateSliderOrRepresent = useCallback( (item, type) => {
        post(api.product_slider_represent + '?type=' + type, item).then(res => {
            let tmp = listImage.map(tmi => {
                if(tmi.id === item.id) {
                    if(type === 'pepresent' && res.errorCode === SUCCESS) {
                        tmi.isFeatured = res.data.isFeatured;
                    } else if(res.errorCode === SUCCESS) {
                        tmi.isSlideshow = res.data.isSlideshow;
                    }
                };
                return tmi;
            });
            setListImage(tmp);
            dispatch(message({type:'success', message: res.message}))
        }).catch(error => {
            dispatch(message({type:'error', message: error.message}))
        })
    });

    const memoListImage = useMemo( () => {
        if(!listImage || listImage.length <= 0)
            return null;
        return listImage.map(it => {
            return (
                <Row key={it.id} style={{borderBottom: '1px solid #ccc', marginTop:5}}>
                    <Col key={it.id} style={{height:70}} flex="100px">
                        <img style={{width:70, height:70}} src={it.fileName}/>
                    </Col>
                    <Col key={it.image} flex="auto">
                        <Row justify="space-around" align="middle" style={{height:70}}>
                            <Checkbox checked={it.isSlideshow == 1 ? true : false} onClick={() => updateSliderOrRepresent(it, 'slider')}>Ảnh Slider</Checkbox>
                            <Checkbox checked={it.isFeatured == 1 ? true : false} onClick={() => updateSliderOrRepresent(it, 'pepresent')}>Ảnh đại diện</Checkbox>
                            <Button onClick={() => removeImage(it)} type="primary" shape="round" icon={<DeleteOutlined />} size={20} />
                        </Row>
                    </Col>
                </Row>
            );
        })
    }, [listImage]);

    const memoCkeditor = useMemo(() => {
        return <CKEditor
            config= {{ language: 'vn',height:500 }}
            activeClass="p10"
            content={content}
            events={{
                "change": callbackContent
            }}
        />
    }, [content]);

    return <>
        <Form form={form} name="horizontal_login" layout="vertical" onFinish={onFinish}>
            <Row justify="space-around">
                <Col style={{ padding: 8 }} span={10}>
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
                    <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true }]}>
                        <Select
                            placeholder="Chọn danh mục"
                            allowClear>
                            {listCategory}
                        </Select>
                    </Form.Item>
                    <Tags
                        urlFetch={`${gateway}/${api.page_mix_tag}`}
                        setListTags={setListTags}
                        data={product.listTags}
                        value={product.tags != null ? JSON.parse(product.tags) : []} />
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
                            Tạo mới
                        </Button>
                    </Form.Item>
                </Col>
                <Col style={{ padding: 8 }} span={14}>
                    {memoCkeditor}
                </Col>
            </Row>
        </Form>
    </>
}

ProductForm.defaultProps = {
    product: {},
    mode: 'create'
}

export default ProductForm;
