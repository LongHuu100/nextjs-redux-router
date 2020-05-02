import Helmet from 'react-helmet'
import {RightOutlined} from '@ant-design/icons'
import { useState } from 'react'
import { fetch } from 'libs/request'
import { api, SUCCESS } from 'config'

const TinTuc =  props => {

    const [page] = useState(props.pageProps.data);

    return (
        <>
            <Helmet>
                <title>{page.title}</title>
            </Helmet>
            <div className="container our-services">
                <ul className="ht-breadcrumb">
                    <li><a href="/">Trang chủ</a></li>
                    <li><a href="/tin-tuc">Tin tức</a></li>
                    <li className="active">
                        <h1>{page.name}</h1>
                    </li>
                </ul>
                <div className="row ht-mgt24" id="content-news-detail">
                    <div className="col-md-9 col-xs-12 ct-news-mo">
                        <div className="ht-article-card ht-card pl-news-detail">
                            <h3 className="ht-news-title">{page.name}</h3>
                            <hr/>
                            <div dangerouslySetInnerHTML={{__html: page != null ? page.content : ''}} />
                        </div>
                        <div id="product-dx" className="col-xs-12 ht-mgt24 news-lq">
                            <div className="title-product-news">
                                <h2>tin tức liên quan</h2>
                                <span className="number"><img src="/images/gach-den.jpg" /></span>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-sm-6 col-md-4 item-news item-new2">
                                    <div className="ht-news-card">
                                        <div className="card-header">
                                            <div className="ht-rectangle ratio-32">
                                                <a href="https://printgo.vn/the-nao-la-file-thiet-ke-chuan-in-name-card-v260"
                                                   className="ht-inner">
                                                    <img src="https://cdn.printgo.vn/uploads/media/766535/quy-chuan-file-in-8_1572429093.jpg"/>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="card-content">
                                            <h3 className="news-title"><a
                                                href="https://printgo.vn/the-nao-la-file-thiet-ke-chuan-in-name-card-v260">Các
                                                bước để có file chuẩn in trong in ấn namecard tại Printgo</a>
                                            </h3>
                                            <div className="news-excerpt">Để cung cấp rõ hơn thông tin cho quý khách lựa
                                                chọn gói khuyến mại 79k/5 hộp của Printgo, chúng tôi đã dành bài viết
                                                này để nêu rõ về những quy chuẩn file in thiết kế được chấp nhận
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6 col-md-4 item-news item-new2">
                                    <div className="ht-news-card">
                                        <div className="card-header">
                                            <div className="ht-rectangle ratio-32">
                                                <a href="https://printgo.vn/4-loi-ich-hap-dan-nhat-danh-cho-nha-thiet-ke-khi-tham-gia-san-choi-cua-printgo-v264"
                                                   className="ht-inner">
                                                    <img src="https://cdn.printgo.vn/uploads/media/766535/4-loi-ich-hap-dan-nhat-danh-cho-nha-thiet-khi-tham-gia-san-choi-cua-printgo_1572495761.jpg"/>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="card-content">
                                            <h3 className="news-title"><a
                                                href="https://printgo.vn/4-loi-ich-hap-dan-nhat-danh-cho-nha-thiet-ke-khi-tham-gia-san-choi-cua-printgo-v264">4
                                                lợi ích hấp dẫn nhất dành cho nhà thiết kế khi tham gia “sân chơi” của
                                                Printgo</a>
                                            </h3>
                                            <div className="news-excerpt">Các nhà thiết kế hãy tham gia hợp tác ngay
                                                cùng Printgo bởi những lợi ích hấp dẫn trong bài
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6 col-md-4 item-news item-new2">
                                    <div className="ht-news-card">
                                        <div className="card-header">
                                            <div className="ht-rectangle ratio-32">
                                                <a href="https://printgo.vn/20-bi-mat-dang-sau-y-nghia-cua-nhung-logo-noi-tieng-p1-v13"
                                                   className="ht-inner">
                                                    <img src="https://cdn.printgo.vn/uploads/media/760080/origin.business-logo-design_1558692722.jpg"/>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="card-content">
                                            <h3 className="news-title"><a
                                                href="https://printgo.vn/20-bi-mat-dang-sau-y-nghia-cua-nhung-logo-noi-tieng-p1-v13">20
                                                bí mật đằng sau ý nghĩa của những logo nổi tiếng (P1)</a>
                                            </h3>
                                            <div className="news-excerpt">Hãy cùng khám phá ý nghĩa thực sự của những
                                                logo mang thương hiệu nổi tiếng mà bạn có thể đã biết.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-xs-12 ht-news-leftct">
                        <div className="sliderbar-detail-news">
                            <div className="inner_title">
                                <h2 className="h2">
                                    <span>danh mục tin</span>
                                </h2>
                                <span className="number">
                                    <img src="/images/gach-den.jpg"/>
                                </span>
                            </div>
                            <div className="sidebar-list-cate">
                                <ul className="sidebar-category-list list-unstyled">
                                    <li className="active">
                                        <RightOutlined style={styles.iconRight} />
                                        <a href="https://printgo.vn/ky-thuat-in-p4">Mobile monney</a>
                                    </li>
                                    <li className="active">
                                        <RightOutlined style={styles.iconRight} />
                                        <a href="https://printgo.vn/do-hoa-p5">Ví điện tử</a>
                                    </li>
                                    <li className="active">
                                        <RightOutlined style={styles.iconRight} />
                                        <a href="https://printgo.vn/my-thuat-p6">PayPal</a>
                                    </li>
                                    {/*<li className="active">*/}
                                    {/*    <RightOutlined style={styles.iconRight} />*/}
                                    {/*    <a className="unset"  href="https://printgo.vn/tin-tuc-printgo-p7">Tin tức Printgo </a>*/}
                                    {/*    <ul className="sidebar-category-list list-unstyled">*/}
                                    {/*        <a className="unset" href="https://printgo.vn/tin-tuc-printgo-p7"></a>*/}
                                    {/*        <li className="active">*/}
                                    {/*            <a className="unset"  href="https://printgo.vn/tin-tuc-printgo-p7">*/}
                                    {/*                <RightOutlined style={styles.iconRight} />*/}
                                    {/*            </a>*/}
                                    {/*            <a href="https://printgo.vn/faqs-p9">FAQs</a>*/}
                                    {/*        </li>*/}
                                    {/*        <li className="active">*/}
                                    {/*            <RightOutlined style={styles.iconRight} />*/}
                                    {/*            <a href="https://printgo.vn/tuyen-dung-p10">Tuyển dụng</a>*/}
                                    {/*        </li>*/}
                                    {/*    </ul>*/}
                                    {/*</li>*/}
                                    <li className="active">
                                        <RightOutlined style={styles.iconRight} />
                                        <a href="https://printgo.vn/khuyen-mai-p8">Blockchain và ứng dụng</a>
                                    </li>
                                    <li className="active">
                                        <RightOutlined style={styles.iconRight} />
                                        <a href="https://printgo.vn/khuyen-mai-p8">Dữ liệu lớn (Big data)</a>
                                    </li>
                                    <li className="active">
                                        <RightOutlined style={styles.iconRight} />
                                        <a href="https://printgo.vn/khuyen-mai-p8">AI và học máy</a>
                                    </li>
                                    <li className="active">
                                        <RightOutlined style={styles.iconRight} />
                                        <a href="https://printgo.vn/khuyen-mai-p8">Dữ liệu phân tán và quản trị</a>
                                    </li>
                                    <li className="active">
                                        <RightOutlined style={styles.iconRight} />
                                        <a href="https://printgo.vn/khuyen-mai-p8">FAQ</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="ht-left-1">
                            <div className="inner_title text-left">
                                <p className="des">câu hỏi thường gặp</p>
                                <h2 className="h2"><span>hỏi đáp</span></h2>
                                <span className="number"><img src="/images/gach-den.jpg"/></span>
                            </div>
                            <div className="col-xs-12 bt-4new">
                                <div className="panel-group">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">
                                                <a className="add-faq" >
                                                    <img src="/images/icn.jpg" /> Làm thế nào để có file chuẩn in cho name card?
                                                </a>
                                            </h3>
                                        </div>
                                        <div style={{padding: 10,background: '#f5f5f5'}} className="panel-collapse collapse"></div>
                                    </div>
                                </div>
                                <div className="panel-group">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">
                                                <a className="add-faq" >
                                                    <img src="/images/icn.jpg" /> Làm thế nào để có file chuẩn in cho name card?
                                                </a>
                                            </h3>
                                        </div>
                                        <div style={{padding: 10,background: '#f5f5f5'}} className="panel-collapse collapse"></div>
                                    </div>
                                </div>
                                <div className="panel-group">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">
                                                <a className="add-faq" >
                                                    <img src="/images/icn.jpg" /> Làm thế nào để có file chuẩn in cho name card?
                                                </a>
                                            </h3>
                                        </div>
                                        <div style={{padding: 10,background: '#f5f5f5'}} className="panel-collapse collapse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 ht-left-2" style={{marginTop:30}}>
                            <div className="inner_title text-left">
                                <p className="des">CẬP NHẬT TIN TỨC XU HƯỚNG CÔNG NGHỆ</p>
                                <span className="number">
                                    <img src="/images/gach-den.jpg"/>
                                </span>
                            </div>
                            <a href="https://printgo.vn/sieu-khuyen-mai-dau-nam-giam-gia-50-goi-thiet-ke-nhan-dien-thuong-hieu-vang-v328">
                                <img className="lazy" src="https://cdn.printgo.vn/uploads/banners/0/f472a6c68ffaa640eac03cd5d2fdbe35.png"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

TinTuc.getInitialProps = async ({store, query}) => {
    const data = await fetch(api.page_view, {slug: query.slug}).then(res => {
        if(res.errorCode == SUCCESS) {
            return res.data;
        } else {
            return {};
        }
    })
    return { data: data }
}

const styles = {
    'iconRight': {
        fontSize: '10px',
        color: '#aaa',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'block',
        lineHeight: '20px'
    }
}

export default TinTuc;
