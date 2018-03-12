import React from 'react';
import { Layout } from 'antd';
import PopitHeader from "./PopitHeader";
import RecentPosts from "./RecentPosts";
import './popit.css';
import ChannelPostsList from "./ChannelPostsList";
import AuthorPostsList from "./AuthorPostsList";
import AdSense from 'react-adsense';

const { Content, Footer } = Layout;

export default class App extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render(){
    return (
      <Layout className="layout" hasSider={false} style={{background: '#2b2b2b'}}>
        <PopitHeader/>
        <Content style={{ padding: '0 10px'}}>
          <div style={{float: 'left', maxWidth: 1130}}>
            <div style={{padding: 10}}>
              <RecentPosts/>
            </div>
            <div style={{background: "#2b2b2b"}}>
              <ins className="adsbygoogle"
                   style={{display: 'inline-block', width:728, height:90}}
                   data-ad-client="ca-pub-9913849834747247"
                   data-ad-slot="8038920473"></ins>
            </div>
            <div>
              <div style={{padding: 10}}>
                <div style={{float: "left", marginBottom: 10, marginRight: 15}}>
                  <AuthorPostsList/>
                </div>
                <div style={{float: "left", marginBottom: 10}}>
                  <ChannelPostsList/>
                </div>
                <div style={{clear: "both"}}/>
              </div>
            </div>
          </div>
          <div style={{float: 'left', marginLeft: 15}}>
            <div style={{background: "#2b2b2b", width: 300, marginBottom: 20}}>
              <ins className="adsbygoogle"
                   style={{ display: 'inline-block'}}
                   data-ad-client="ca-pub-9913849834747247"
                   data-ad-slot="6500771233"
                   data-ad-format="auto"></ins>
            </div>
            <div style={{background: "#2b2b2b", width: 300}}>
              <div className="fb-page"
                   data-href="https://www.facebook.com/popitkr"
                   data-width="300"
                   small_header="true"
                   data-hide-cover="false"
                   adapt_container_width="false"
                   data-show-facepile="true">
              </div>
            </div>
            <div style={{background: "#2b2b2b", width: 300, marginTop: 120}}>
              <ins className="adsbygoogle"
                   style={{display: 'inline-block'}}
                   data-ad-client="ca-pub-9913849834747247"
                   data-ad-slot="9919828418"
                   data-ad-format="auto"></ins>
            </div>
          </div>
          <div style={{clear: 'both'}}></div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Copyright popit.kr | popit.kr에 등록된 모든 글의 저작권은 저작자에 있으며<br/>
          popit.kr은 사용권만 가지고 있습니다.
        </Footer>
      </Layout>
    );
  }
}