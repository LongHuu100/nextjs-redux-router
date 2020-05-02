import { useEffect } from 'react'
import { CONFIG_MESSAGE, configRoute } from 'actions/config'
import { findRoute } from 'utils/index'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from 'antd';
import { LayoutAdmin, LayoutAuth, LayoutMain, LayoutUser } from 'components'

const Authority = (props) => {

    const dispatch = useDispatch();
    const { config } = useSelector(state => state);

    const openNotificationWithIcon = ( type, content) => {
        notification[type]({
            message: 'Notification Title',
            description: content
        });
    };

    useEffect( () => {
        const message = config.get('message');
        if(message.data != null){
            openNotificationWithIcon(message.type, message.data);
            dispatch({
                type: CONFIG_MESSAGE,
                payload: { type: 'success', data: null }
            })
        }
    }, [config.get('message')])

    return <>
        {(() => {
            const { Component, router, pageProps } = props;
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
            let layout = "Main";
            if(currentRoute && currentRoute.layout !== undefined) {
                layout = currentRoute.layout;
            }

            switch (layout) {
                case "Main" :
                    return (
                        <LayoutMain>
                            <Component router={router} pageProps={pageProps} />
                        </LayoutMain>
                    )
                case 'User':
                    return (
                        <LayoutUser>
                            <Component router={router} pageProps={pageProps}  />
                        </LayoutUser>
                    )
                case 'Admin' :
                    return (
                        <LayoutAdmin>
                            <Component router={router} pageProps={pageProps}  />
                        </LayoutAdmin>
                    )
                default:
                    return (
                        <LayoutAuth>
                            <Component router={router} pageProps={pageProps}  />
                        </LayoutAuth>
                    )
            }
        })()}
    </>
}

export default Authority;
