import React from 'react'

const HomeContainer = (props) => {
    return <>
        <div id="home" className="home">
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
                                    <img src="/images/group.png" alt="marsmello" className="img-fluid"
                                         data-aos="zoom-in-up" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="our-services" id="services">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h5 className="text-dark">We’re offering</h5>
                        <h3 className="font-weight-medium text-dark mb-5">Creative Digital Agency</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 text-center text-lg-left">
                        <div className="services-box">
                            <img src="/images/integrated-marketing.svg" alt="integrated-marketing" />
                            <h6 className="text-dark mb-3 mt-4 font-weight-medium">Integrated
                                Marketing
                            </h6>
                            <p>Lorem ipsum dolor sit amet,
                                pretium pretium tempor.Lorem ipsum
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-4 text-center text-lg-left">
                        <div className="services-box" >
                            <img src="/images/design-development.svg" alt="design-development" />
                            <h6 className="text-dark mb-3 mt-4 font-weight-medium">Design &
                                Development
                            </h6>
                            <p>Lorem ipsum dolor sit amet,
                                pretium pretium tempor.Lorem ipsum
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-4 text-center text-lg-left">
                        <div className="services-box" >
                            <img src="/images/digital-strategy.svg" alt="digital-strategy" />
                            <h6 className="text-dark mb-3 mt-4 font-weight-medium">Digital
                                Strategy
                            </h6>
                            <p>Lorem ipsum dolor sit amet,
                                pretium pretium tempor.Lorem ipsum
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 text-center text-lg-left">
                        <div className="services-box  pb-lg-0">
                            <img src="/images/digital-marketing.svg" alt="digital-marketing" />
                            <h6 className="text-dark mb-3 mt-4 font-weight-medium">Digital
                                Marketing
                            </h6>
                            <p>Lorem ipsum dolor sit amet,
                                pretium pretium tempor.Lorem ipsum
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-4 text-center text-lg-left">
                        <div className="services-box pb-lg-0">
                            <img src="/images/growth-strategy.svg" alt="growth-strategy" />
                            <h6 className="text-dark mb-3 mt-4 font-weight-medium">Growth
                                Strategy
                            </h6>
                            <p>Lorem ipsum dolor sit amet,
                                pretium pretium tempor.Lorem ipsum
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-4 text-center text-lg-left">
                        <div className="services-box pb-0">
                            <img src="/images/saving-strategy.svg" alt="saving-strategy"/>
                            <h6 className="text-dark mb-3 mt-4 font-weight-medium">Saving
                                Strategy
                            </h6>
                            <p>Lorem ipsum dolor sit amet,
                                pretium pretium tempor.Lorem ipsum
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="our-process" id="about">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <h5 className="text-dark">Our work process</h5>
                        <h3 className="font-weight-medium text-dark">Discover New Idea With Us!</h3>
                        <h5 className="text-dark mb-3">Imagination will take us everywhere</h5>
                        <p className="font-weight-medium mb-4">Lorem ipsum dolor sit amet, <br/>
                            pretium pretium tempor.Lorem ipsum dolor sit amet, consectetur
                        </p>
                        <div className="d-flex justify-content-start mb-3">
                            <img src="/images/tick.png" alt="tick" className="mr-3 tick-icon" />
                            <p className="mb-0">Lorem ipsum dolor sit amet, pretium pretium</p>
                        </div>
                        <div className="d-flex justify-content-start mb-3">
                            <img src="/images/tick.png" alt="tick" className="mr-3 tick-icon" />
                            <p className="mb-0">Lorem ipsum dolor sit amet, pretium pretium</p>
                        </div>
                        <div className="d-flex justify-content-start">
                            <img src="/images/tick.png" alt="tick" className="mr-3 tick-icon" />
                            <p className="mb-0">Lorem ipsum dolor sit amet, pretium pretium</p>
                        </div>
                    </div>
                    <div className="col-sm-6 text-right">
                        <img src="/images/idea.png" alt="idea" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
        <div className="contactus" id="contact">
            <div className="container">
                <div className="row mb-5 pb-5">
                    <div className="col-sm-5">
                        <img src="/images/contact.jpg" alt="contact" className="img-fluid" />
                    </div>
                    <div className="col-sm-7">
                        <h3 className="font-weight-medium text-dark mt-5 mt-lg-0">Got A Problem</h3>
                        <h5 className="text-dark mb-5">Lorem ipsum dolor sit amet, consectetur pretium</h5>
                        <form>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="name" placeholder="Name*"/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="mail" placeholder="Email*"/>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <textarea name="message" id="message" className="form-control"
                                                  placeholder="Message*" rows="5" />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <a href="#" className="btn btn-secondary">SEND</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default HomeContainer
