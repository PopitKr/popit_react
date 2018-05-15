import React from 'react';
import { PUBLIC_PATH } from "../routes";
import { Input, Layout } from 'antd';

const Search = Input.Search;
const { Header } = Layout;

export default class PopitMobileHeader extends React.Component {
  search(keyword) {
    document.location.href = `https://www.popit.kr?s=${keyword}`;
  };

  render() {
    const popitLogo = require('../asset/popit_logo.png');

    const logoStyle = {
      /*background: rgba(255,255,255,.2);*/
      backgroundImage: `url(${popitLogo})`,
      margin: '16px 24px 16px 0',
      width: 79,
      height: 32,
      float: 'left',
      cursor: 'pointer'
    };

    const rootPath = PUBLIC_PATH.length > 0 ? PUBLIC_PATH : "/";

    return (
      <Header style={{ position: 'fixed', zIndex: 999, paddingLeft: 20, width: '100%'}}>
        <div>
          <div style={logoStyle} onClick={() => {document.location.href = rootPath}}/>
          <div style={{marginLeft: 20, float: 'left'}}>
            <Search
              placeholder="Search"
              onSearch={value => this.search(value)}
              style={{ width: 150 }}
            />
          </div>
        </div>
      </Header>
    )
  }
}