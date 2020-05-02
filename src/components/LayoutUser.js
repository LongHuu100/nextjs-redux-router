import React from 'react'
import Link from 'next/link'

const LayoutUser = (props) => {

    return <>
        <div id="mobile-menu-overlay"></div>
        <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container">
                <a className="navbar-brand" href="#"><img src="images/logo.svg" alt="Marshmallow" /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"><i className="mdi mdi-menu"> </i></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <div className="d-lg-none d-flex justify-content-between px-4 py-3 align-items-center">
                        <img src="images/logo-dark.svg" className="logo-mobile-menu" alt="logo" />
                            <a href="javascript:;" className="close-menu"><i className="mdi mdi-close"></i></a>
                    </div>
                    <ul className="navbar-nav ml-auto align-items-center">
                        <li className="nav-item active">
                            <a className="nav-link" href="#home">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#services">Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#projects">Projects</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#testimonial">Testimonial</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#plans">Plans</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link btn btn-success" href="#contact">174-394-9560</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className="page-body-wrapper">
            <section id="home" className="home">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="main-banner">
                                <div className="d-sm-flex justify-content-between">
                                    <div data-aos="zoom-in-up">
                                        <div className="banner-title">
                                            <h3 className="font-weight-medium">We Help Power
                                                Millions Of Businesses
                                                in 100+ Countries
                                            </h3>
                                        </div>
                                        <p className="mt-3">Lorem Ipsum is simply dummy text of the printing and
                                            typesetting industry.
                                            <br/>
                                            Lorem Ipsum has been the industry's standard dummy text ever since the
                                            1500s,
                                        </p>
                                        <a href="#" className="btn btn-secondary mt-3">Learn more</a>
                                    </div>
                                    <div className="mt-5 mt-lg-0">
                                        <img src="images/group.png" alt="marsmello" className="img-fluid"
                                             data-aos="zoom-in-up" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default LayoutUser;
