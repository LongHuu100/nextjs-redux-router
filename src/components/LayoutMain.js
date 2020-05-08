import React, { useMemo, useState } from 'react'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import Link from 'next/link'

const LayoutMain = (props) => {

    const [collapMenu, setCollapMenu] = useState('');
    const memoFooter = useMemo(() => {
        return (
            <footer className="footer">
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <address>
                                    <p>143 castle road 517</p>
                                    <p className="mb-4">district, kiyev port south Canada</p>
                                    <div className="d-flex align-items-center">
                                        <p className="mr-4 mb-0">+3 123 456 789</p>
                                        <a href="mailto:info@yourmail.com" className="footer-link">info@yourmail.com</a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <p className="mr-4 mb-0">+1 222 345 342</p>
                                        <a href="mailto:Marshmallow@yourmail.com"
                                           className="footer-link">Marshmallow@yourmail.com</a>
                                    </div>
                                </address>
                            </div>
                            <div className="col-sm-6">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <h6 className="footer-title">Social Share</h6>
                                        <ul className="list-footer">
                                            <li><a href="#" className="footer-link">Home</a></li>
                                            <li><a href="#" className="footer-link">About</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-4">
                                        <h6 className="footer-title">Product</h6>
                                        <ul className="list-footer">
                                            <li><a href="#" className="footer-link">Digital Marketing</a></li>
                                            <li><a href="#" className="footer-link">Web Development</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-4">
                                        <h6 className="footer-title">Company</h6>
                                        <ul className="list-footer">
                                            <li><a href="#" className="footer-link">Partners</a></li>
                                            <li><a href="#" className="footer-link">Investors</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <img src="/images/logo.svg" alt="logo" className="mr-3" />
                                <p className="mb-0 text-small pt-1">© 2019-2020
                                    <a href="https://www.bootstrapdash.com" className="text-white" target="_blank">BootstrapDash</a>.
                                    All rights reserved.</p>
                            </div>
                            <div>
                                <div className="d-flex">
                                    <a href="#" className="text-small text-white mx-2 footer-link">Privacy Policy </a>
                                    <a href="#" className="text-small text-white mx-2 footer-link">Customer Support </a>
                                    <a href="#" className="text-small text-white mx-2 footer-link">Careers </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    },[]);

    const memoNav = useMemo(() => {
        return <>
            <div id="mobile-menu-overlay"></div>
            <nav className="navbar navbar-expand-lg fixed-top">
                <div className="container">
                    <Link href="/"><a className="navbar-brand"><img src="/images/logo.svg" alt="Logo M2Viet" /></a></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                            aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">
                        <MenuOutlined onClick={() => {setCollapMenu('show')}} />
                    </span>
                    </button>
                    <div className={`collapse navbar-collapse ${collapMenu}`} id="navbarTogglerDemo01">
                        <div className="d-lg-none d-flex justify-content-between px-4 py-3 align-items-center">
                            <img src="/images/logo-dark.svg" className="logo-mobile-menu" alt="logo" />
                            <a className="close-menu">
                                <CloseOutlined onClick={() => {setCollapMenu('')}} />
                            </a>
                        </div>
                        <ul className="navbar-nav ml-auto align-items-center">
                            <li className="nav-item active">
                                <Link href="/">
                                    <a className="nav-link">Trang chủ <span className="sr-only">(current)</span></a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/mobile-monney"><a className="nav-link">Tiền điện tử</a></Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/paypal"><a className="nav-link">Hỗ trợ Paypal</a></Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/tintuc?slug=voucher-fik-vc" as="/mobile-money/voucher-fik-vc-i10">
                                    <a className="nav-link">Tin tức</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href='/login'><a className="nav-link">Đặng nhập</a></Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link btn btn-success">174-394-9560</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    },[collapMenu]);

    return <>
        {memoNav}
        <div className="page-body-wrapper">
            { props.children }
        </div>
        {memoFooter}
    </>
}

export default LayoutMain;
