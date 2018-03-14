import React from 'react';
import { Layout, Icon } from "antd/lib/index";
import './popit.css';

const { Header } = Layout;

export default class PopitHeader extends React.Component {
  render() {
    return (
      <Header>
        <div className="logo" style={{cursor: 'pointer'}} onClick={() => {document.location.href = "/v2"}}/>
        <div style={{float: 'right'}}>
          <a style={{color: '#DEDEDE', fontWeight: 'bold', marginRight: 20}} href="http://www.popit.kr/how-to-contribute/"><Icon type="edit" />&nbsp;&nbsp;저자신청</a>
          <a style={{color: '#DEDEDE', fontWeight: 'bold'}} href="http://www.popit.kr/category/%ea%b3%b5%ec%a7%80%ec%82%ac%ed%95%ad/">&nbsp;&nbsp;<Icon type="sound" />&nbsp;&nbsp;공지사항</a>
        </div>
      </Header>
    )
  }
}