import Helmet from 'react-helmet'
import { Row, Breadcrumb } from 'antd'
import FaqsForm from 'containers/faqs.form'
import { fetch } from 'libs/request'
import { api, SUCCESS } from 'config'
import Link from 'next/link'

const AdminFaqsUpdate =  props => {

    return (
        <>
            <Helmet>
                <title>Sửa bài viết tags</title>
            </Helmet>
            <Row style={{ padding: 8 }} justify="start">
                <Breadcrumb>
                    <Breadcrumb.Item>Trang quản trị</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link href="/admin/faqs"><a>Faqs</a></Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {props.pageProps.data.name}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <FaqsForm faqs={props.pageProps.data} mode="update" />
        </>
    )
}

AdminFaqsUpdate.getInitialProps = async ({store, query}) => {
    const data = await fetch(api.faqs_view, {id: query.id}).then(res => {
        if(res.errorCode == SUCCESS) {
            return res.data;
        } else {
            return {};
        }
    }).catch( ex => {
        console.error('[pages.admin.AdminFaqsUpdate]:', ex.message)
    })
    return { data: data }
}

export default AdminFaqsUpdate;
