import React from 'react';
import { Layout } from "antd";
import './popit.css';

const { Header, Footer } = Layout;

export default class PopitFooter extends React.Component {
  render() {
    return (
      <Footer style={{textAlign: 'center', marginTop: 10}}>
        Copyright© popit.kr | popit.kr에 등록된 모든 글의 저작권은 저작자에 있으며<br/>
        popit.kr은 사용권만 가지고 있습니다.
      </Footer>
    )
  }
}