import Helmet from 'react-helmet'
import { Row, Breadcrumb } from 'antd'
import PageForm from 'containers/page-form'

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
                        <a href="">Tin tức</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Tạo mới
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <PageForm />
        </>
    )
}

export default AdminPageCreate;
