import Helmet from 'react-helmet'
import { Row, Breadcrumb } from 'antd'
import PageForm from 'containers/page/page-form'
import Link from 'next/link'

const AdminPageCreate =  props => {

    return (
        <>
            <Helmet>
                <title>Quản lý tin tức</title>
            </Helmet>
            <Row style={{ padding: 8 }} justify="start">
                <Breadcrumb>
                    <Breadcrumb.Item>Trang quản trị</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link href="/admin/page">Tin tức</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Tạo mới
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <PageForm mode="create" />
        </>
    )
}

export default AdminPageCreate;
