import React from 'react';
import { PUBLIC_PATH } from "../routes";
import { Layout, Menu, Icon } from 'antd';

import './popit.css';

const { Sider } = Layout;

export default class PopitMobileHeader extends React.Component {
  search(keyword) {
    document.location.href = `https://www.popit.kr?s=${keyword}`;
  };

  clickSideMenu(item) {
    if (item.key === "1") {
      document.location.href = "https://www.popit.kr/wp-admin/";
    } else if (item.key === "2") {
      document.location.href = `${PUBLIC_PATH}/how-to-contribute/`;
    } else if (item.key === "3") {
      document.location.href = `${PUBLIC_PATH}/category/%ea%b3%b5%ec%a7%80%ec%82%ac%ed%95%ad/`;
    }
  };

  render() {
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      >
        <Menu theme="dark" mode="inline" onClick={this.clickSideMenu}>
          <Menu.Item key="1">
            <Icon type="setting" />
            <span className="nav-text">로그인</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="edit" />
            <span className="nav-text">저자신청</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="sound" />
            <span className="nav-text">공지사항</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}