import Helmet from 'react-helmet'
import { Row, Breadcrumb } from 'antd'
import PageForm from 'containers/page/page-form'
import { fetch } from 'libs/request'
import { api, SUCCESS } from 'config'
import Link from 'next/link'

const AdminPageUpdate =  props => {

    return (
        <>
            <Helmet>
                <title>Sửa bài viết tin tức</title>
            </Helmet>
            <Row style={{ padding: 8 }} justify="start">
                <Breadcrumb>
                    <Breadcrumb.Item>Trang quản trị</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link href="/admin/page"><a>Tin tức</a></Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Tạo mới
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <PageForm page={props.pageProps.data} mode="update" />
        </>
    )
}

AdminPageUpdate.getInitialProps = async ({store, query}) => {
    const data = await fetch(api.page_view, {slug: query.slug}).then(res => {
        if(res.errorCode == SUCCESS) {
            return res.data;
        } else {
            return {};
        }
    })
    return { data: data }
}

export default AdminPageUpdate;
