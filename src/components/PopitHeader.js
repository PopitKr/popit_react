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
          <Menu.Item key="1"><a style={{color: '#DEDEDE', fontWeight: 'bold'}} href="http://www.popit.kr/how-to-contribute/">저자신청</a></Menu.Item>
          <Menu.Item key="2"><a style={{color: '#DEDEDE', fontWeight: 'bold'}} href="http://www.popit.kr/category/%ea%b3%b5%ec%a7%80%ec%82%ac%ed%95%ad/">공지사항</a></Menu.Item>
        </Menu>
      </Header>
    )
  }
}