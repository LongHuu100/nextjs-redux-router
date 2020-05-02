import Helmet from 'react-helmet'
import { Row, Breadcrumb } from 'antd'
import TagsForm from 'containers/tags.form'
import { fetch } from 'libs/request'
import { api, SUCCESS } from 'config'
import Link from 'next/link'

const AdminTagsUpdate =  props => {

    return (
        <>
            <Helmet>
                <title>Sửa bài viết tags</title>
            </Helmet>
            <Row style={{ padding: 8 }} justify="start">
                <Breadcrumb>
                    <Breadcrumb.Item>Trang quản trị</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link href="/admin/tags"><a>Tags</a></Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {props.pageProps.data.name}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <TagsForm tags={props.pageProps.data} mode="update" />
        </>
    )
}

AdminTagsUpdate.getInitialProps = async ({store, query}) => {
    const data = await fetch(api.tags_view, {id: query.id}).then(res => {
        if(res.errorCode == SUCCESS) {
            return res.data;
        } else {
            return {};
        }
    }).catch( ex => {
        console.error('[pages.admin.AdminTagsUpdate]:', ex.message)
    })
    return { data: data }
}

export default AdminTagsUpdate;
