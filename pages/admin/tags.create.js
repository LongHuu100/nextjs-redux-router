import { Helmet } from 'react-helmet'
import { Row, Breadcrumb } from 'antd'
import TagsForm from 'containers/tags.form'
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
                        <Link href="/admin/tags">Tags</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Tạo mới
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <TagsForm mode="create" />
        </>
    )
}

export default AdminPageCreate;
