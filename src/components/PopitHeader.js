import React from 'react';
import { Layout, Menu } from "antd/lib/index";
import './popit.css';

const { Header } = Layout;

export default class PopitHeader extends React.Component {
  render() {
    return (
      <Header>
        <div className="logo"/>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">저자신청</Menu.Item>
          <Menu.Item key="2">공지사항</Menu.Item>
        </Menu>
      </Header>
    )
  }
}