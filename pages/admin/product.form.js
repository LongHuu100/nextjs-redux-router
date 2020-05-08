import { Helmet } from 'react-helmet'
import { Row, Breadcrumb } from 'antd'
import ProductForm from 'containers/products/product-form'
import Link from 'next/link'
import React from 'react'
import { fetch } from 'libs/request'
import { api, SUCCESS } from 'config'

const AdminProductForm =  props => {
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
                        Tạo mới
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <ProductForm mode={props.pageProps.mode} product={props.pageProps.data} />
        </>
    )
}

AdminProductForm.getInitialProps = async ({store, query}) => {
    let product = null; const mode = query.mode || 'create';
    if(mode === 'edit'){
        const req = await fetch(api.product_view, {id: query.id});
        if(req.errorCode === SUCCESS)
            product = req.data
    }
    return {
        mode: mode,
        data: product
    }
}

export default AdminProductForm;
