import React from 'react';
import { Layout, Icon, Input } from "antd";
import './popit.css';

const Search = Input.Search;
const { Header } = Layout;

export default class PopitHeader extends React.Component {
  search = (keyword) => {
    document.location.href = `http://www.popit.kr?s=${keyword}`;
  };

  render() {
    return (
      <Header>
        <div className="logo" style={{cursor: 'pointer'}} onClick={() => {document.location.href = "/v2"}}/>
        <div style={{float: 'right', marginLeft: 20}}>
          <a style={{color: '#DEDEDE', fontWeight: 'bold', marginRight: 20}} href="http://www.popit.kr/how-to-contribute/"><Icon type="edit" />&nbsp;&nbsp;저자신청</a>
          <a style={{color: '#DEDEDE', fontWeight: 'bold'}} href="http://www.popit.kr/category/%ea%b3%b5%ec%a7%80%ec%82%ac%ed%95%ad/">&nbsp;&nbsp;<Icon type="sound" />&nbsp;&nbsp;공지사항</a>
        </div>
        <div style={{float: 'right', marginLeft: 20}}>
          <Search
            placeholder="Search"
            onSearch={value => this.search(value)}
            style={{ width: 200 }}
          />
        </div>

      </Header>
    )
  }
}