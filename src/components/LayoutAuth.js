import React, { PureComponent } from 'react'
import { Layout } from 'antd';
const {Content} = Layout;

export default class LayoutAuth extends PureComponent {
    render () {
        return <>
            <Layout>
                <Content>
                    {this.props.children}
                </Content>
            </Layout>
        </>;
    }
}
