import React from 'react';
import { Layout } from 'antd';
import PopitHeader from "./PopitHeader";
import RecentPosts from "./RecentPosts";
import './popit.css';
import TagPostsList from "./TagPostsList";
import AuthorPostsList from "./AuthorPostsList";
import GoogleAd from './GoogleAd';

const { Content, Footer } = Layout;

export default class App extends React.Component {
  render() {
    return (
      <Layout className="layout" hasSider={false} style={{background: '#ffffff'}}>
        <PopitHeader/>
        <Content style={{ padding: '0 10px', maxWidth: 1360, margin: 'auto auto'}}>
          <div style={{float: 'left', maxWidth: 1040}}>
            <div style={{padding: 15}}>
              <RecentPosts/>
            </div>
            <div style={{textAlign: 'center'}}>
              <GoogleAd adStyle={{display: 'inline-block', width: 728,  height: 90 }}
                        slot="8038920473">
              </GoogleAd>
            </div>
            <div>
              <div style={{padding: 15}}>
                <div style={{float: "left", marginBottom: 10, marginRight: 45}}>
                  <AuthorPostsList/>
                </div>
                <div style={{float: "left", marginBottom: 10}}>
                  <TagPostsList/>
                </div>
                <div style={{clear: "both"}}/>
              </div>
            </div>
          </div>
          <div style={{float: 'left'}}>
            <div style={{width: 300, height: 250, marginTop: 15, marginBottom: 15}}>
              <GoogleAd adStyle={{display: 'inline-block', width: 300}}
                        slot="6500771233">
              </GoogleAd>
            </div>
            <div style={{width: 300}}>
              <div className="fb-page"
                   data-href="https://www.facebook.com/popitkr"
                   data-width="300"
                   small_header="true"
                   data-hide-cover="false"
                   adapt_container_width="false"
                   data-show-facepile="true">
              </div>
            </div>
            <div style={{width: 300, marginTop: 15}}>
              <GoogleAd adStyle={{display: 'inline-block', width: 300, height: 600 }}
                        slot="9919828418">
              </GoogleAd>
            </div>
          </div>
          <div style={{clear: 'both'}}></div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Copyright© popit.kr | popit.kr에 등록된 모든 글의 저작권은 저작자에 있으며<br/>
          popit.kr은 사용권만 가지고 있습니다.
        </Footer>
      </Layout>
    );
  }
}