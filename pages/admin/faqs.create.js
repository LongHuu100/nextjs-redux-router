import { Helmet } from 'react-helmet'
import { Row, Breadcrumb } from 'antd'
import FaqsForm from 'containers/faqs.form'
import Link from 'next/link'

const AdminFaqCreate =  props => {

    return (
        <>
            <Helmet>
                <title>Quản lý tin tức</title>
            </Helmet>
            <Row style={{ padding: 8 }} justify="start">
                <Breadcrumb>
                    <Breadcrumb.Item>Trang quản trị</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link href="/admin/tags">Faqs</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Tạo mới
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <FaqsForm mode="create" />
        </>
    )
}

export default AdminFaqCreate;
