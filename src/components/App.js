import React from 'react';
import { Layout } from 'antd';
import PopitHeader from "./PopitHeader";
import RecentPosts from "./RecentPosts";
import './popit.css';
import ChannelPostsList from "./ChannelPostsList";
import AuthorPostsList from "./AuthorPostsList";

const { Content, Footer } = Layout;

export default class App extends React.Component {
  render(){
    const channelDivStyle = {
      width: "60%",
      // padding: "20px",
      // marginTop: "20px",
      float: "left",
    };

    const authorDivStyle = {
      width: "30%",
      // padding: "20px",
      // marginTop: "20px",
      float: "left",
    };

    return (
      <Layout className="layout" hasSider={false}>
        <PopitHeader/>
        <Content style={{ padding: '0 20px' }}>
          <div style={{ background: '#fff', padding: 15 }}>
            <RecentPosts/>
          </div>
          <div style={{height: 100, padding: 15, background: "#eee"}}>
            광고 영역
          </div>
          <div style={{ background: '#fff', padding: 15 }}>
            <div style={authorDivStyle}>
              <AuthorPostsList/>
            </div>
            <div style={channelDivStyle}>
              <ChannelPostsList/>
            </div>
            <div style={{clear: "both"}}/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Copyright popit.kr
        </Footer>
      </Layout>
    );
  }
}