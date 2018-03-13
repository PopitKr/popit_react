import React from 'react';
import { Layout } from 'antd';
import PopitHeader from "./PopitHeader";
import RecentPosts from "./RecentPosts";
import './popit.css';
import TagPostsList from "./TagPostsList";
import AuthorPostsList from "./AuthorPostsList";

const { Content, Footer } = Layout;

export default class App extends React.Component {
  render(){
    return (
      <Layout className="layout" hasSider={false} style={{background: '#ffffff'}}>
        <PopitHeader/>
        <Content style={{ padding: '0 10px'}}>
          <div style={{float: 'left', maxWidth: 1040}}>
            <div style={{padding: 15}}>
              <RecentPosts/>
            </div>
            <div style={{textAlign: 'center'}}>
              <ins className="adsbygoogle"
                   style={{display: 'inline-block', width:728, height:90}}
                   data-ad-client="ca-pub-9913849834747247"
                   data-ad-slot="8038920473"></ins>
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
            <div style={{width: 320, marginBottom: 15}}>
              <ins className="adsbygoogle"
                   style={{display: 'block'}}
                   data-ad-format="fluid"
                   data-ad-layout-key="-8d+1f-e9+fe+k6"
                   data-ad-client="ca-pub-9913849834747247"
                   data-ad-slot="5956995695"></ins>
            </div>
            <div style={{width: 320}}>
              <div className="fb-page"
                   data-href="https://www.facebook.com/popitkr"
                   data-width="320"
                   small_header="true"
                   data-hide-cover="false"
                   adapt_container_width="false"
                   data-show-facepile="true">
              </div>
            </div>
            <div style={{width: 320, marginTop: 120}}>
              <ins className="adsbygoogle"
                   style={{display: 'block'}}
                   data-ad-format="fluid"
                   data-ad-layout-key="-8d+1f-e9+fe+k6"
                   data-ad-client="ca-pub-9913849834747247"
                   data-ad-slot="5897285940"></ins>
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