import 'antd/dist/antd.css'
import 'assets/css/app.css'
import React, { useState } from 'react'
import { Layout, Menu, Input, Dropdown, Avatar } from 'antd';
import {
    DatabaseFilled, QuestionCircleOutlined, UnorderedListOutlined, BranchesOutlined,
    ContainerOutlined, MenuOutlined, DownloadOutlined, PlusSquareOutlined
} from '@ant-design/icons';
import Link from 'next/link'

const { Content, Sider, Header } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

const LayoutAdmin = (props) => {

    const [collapsed, setCollapsed] = useState(false);
    const menuRegis = (
        <Menu>
            <Menu.Item>
                <a rel="noopener noreferrer" onClick={ () => {}}> Đăng xuất </a>
            </Menu.Item>
            <Menu.Item>
                <Link href="/register"><a rel="noopener noreferrer"> Đăng ký </a></Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout>
            <Sider className="slider-menu" trigger={null} collapsed={collapsed} width={256} style={{background: '#fff'}}>
                <Menu mode="inline" theme="dark">
                    <div className="logo">
                        <Link href="/">
                            <a><img alt="Logo" src="/static/logo.png"/></a>
                        </Link>
                    </div>
                    <SubMenu key="sm1" icon={<DatabaseFilled/>} title="Tin tức">
                        <Menu.Item key="11">
                            <Link href="/admin/page">
                                <a><BranchesOutlined style={styles.iconRight} /> Danh sách</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="12">
                            <Link href="/admin/page.create">
                                <a><PlusSquareOutlined style={styles.iconRight} /> Tạo mới</a>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sm2" icon={<QuestionCircleOutlined/>} title="Faq & Tags">
                        <Menu.Item key="21">
                            <Link href="/admin/tags">
                                <a><BranchesOutlined style={styles.iconRight} /> Danh sách tags</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="22">
                            <Link href="/admin/faqs">
                                <a><ContainerOutlined style={styles.iconRight} /> Danh sách faqs</a>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="m3" icon={<UnorderedListOutlined />}>
                        <Link href="/admin/page.category">
                            <a style={styles.anchor}>Danh mục</a>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <MenuOutlined
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={ () => setCollapsed(!collapsed)}
                    />
                    <div className="head-right">
                        <Search
                            placeholder="Bạn cần tìm gì?"
                            onSearch={value => console.log(value)}
                            style={{ width: 200 }}
                        />
                        <Dropdown overlay={menuRegis}>
                            <a onClick={() =>{}} className="ant-dropdown-link user__doas">
                                <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf', }}>U</Avatar> Devapi <DownloadOutlined />
                            </a>
                        </Dropdown>
                    </div>
                </Header>
                <Layout>
                    <Content>
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

const styles = {
    'iconRight': {
        display: 'inline-grid'
    },
    'anchor': {
        color: '#fff'
    }
}

export default LayoutAdmin;
