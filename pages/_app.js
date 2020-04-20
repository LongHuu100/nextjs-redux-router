import 'antd/dist/antd.css'
import 'libs/app.css'
import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux'
import App from 'next/app'
import createStore from 'store/createStore'
import Auth from 'utils/auth'
import { withRouter } from 'next/router'

class RunApp extends App {

    render () {
        const { store, router, Component, pageProps } = this.props;
        return (
            <Provider store={store}>
                <Auth router={router} Component={Component} pageProps={pageProps} />
            </Provider>
        );
    }
}

export default withRedux(createStore)( withRouter(RunApp) )
