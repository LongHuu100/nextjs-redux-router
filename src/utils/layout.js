import { useState } from 'react'
import { LayoutAdmin, LayoutMain, LayoutUser, LayoutAuth } from 'components'

const Layout = (props) => {

    const [ layout ] = useState( props.layout);

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

export default Layout;
