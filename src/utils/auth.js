import { Component, useEffect, useState } from 'react'
import { LayoutAdmin, LayoutMain, LayoutUser, LayoutAuth } from 'components'
import { CONFIG_MESSAGE, configRoute } from 'actions/config'
import { findRoute } from 'utils/routes.config'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from 'antd';

const Auth = (props) => {

    const [ layout, setLayout ] = useState('Main');
    const dispatch = useDispatch();
    const { config } = useSelector(state => state);

    const openNotificationWithIcon = ( type, content) => {
        notification[type]({
            message: 'Notification Title',
            description: content
        });
    };

    useEffect( () => {

        const { router } = props;
        const { pathname, state } = router;

        const redirectUrl = state && state.redirectUrl ? state.redirectUrl : '/';
        const currentRoute = findRoute(pathname);
        dispatch( configRoute(currentRoute) );

        const user = config.get('user');
        if (currentRoute && currentRoute.is_auth_require === true && user === null) {
            router.push({
                pathname: '/login',
                state: { urlRedirect: pathname }
            });
        } else if (pathname !== '/login' && redirectUrl != '/') {
            router.push({ pathname: redirectUrl });
        }
        if(currentRoute && currentRoute.layout !== undefined) {
            setLayout(currentRoute.layout);
        } else {
            setLayout("Main");
        }
    }, [props.router.route]);

    useEffect( () => {
        const message = config.get('message');
        if(message.data != null){
            openNotificationWithIcon(message.type, message.data);
            dispatch({
                type: CONFIG_MESSAGE,
                payload: {
                    type: 'success',
                    data: null
                }
            })
        }
    }, [config.get('message')])

    return <>
        {(() => {
            const { Component, router, pageProps } = props;
            switch (layout) {
                case "Main" :
                    return <LayoutMain>
                        <Component router={router} {...pageProps} />
                    </LayoutMain>
                case 'User':
                    return <LayoutUser>
                        <Component router={router} {...pageProps} />
                    </LayoutUser>
                case 'Admin' :
                    return <LayoutAdmin>
                        <Component router={router} {...pageProps} />
                    </LayoutAdmin>
                default:
                    return <LayoutAuth>
                        <Component router={router} {...pageProps} />
                    </LayoutAuth>
            }
        })()}
    </>
}

export default Auth;
