import React from 'react';
import { Layout } from 'antd';
import PopitHeader from "./PopitHeader";
import RecentPosts from "./RecentPosts";
import './popit.css';
import TagPostsList from "./TagPostsList";
import AuthorPostsList from "./AuthorPostsList";
import GoogleAd from './GoogleAd';
import PostApi from "../services/PostApi";

const { Content, Footer } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      googleAds: null,
    };
  }
  componentDidMount() {
    PostApi.getGoogleAds()
      .then(json => {
        if (json.success !== true) {
          alert("Error:" + json.message);
          return;
        }

        this.setState({
          googleAds: json.data,
        });
      })
      .catch(error => {
        alert("Error:" + error);
      });
  };

  render() {
    const { googleAds } = this.state;

    let topAd = null;
    let middleAd = null;
    let bottomAd = null;
    if (googleAds) {
      topAd = (googleAds["google_ad.index.top"]) ? (<GoogleAd googleAd={googleAds["google_ad.index.top"].value}></GoogleAd>) :(<div></div>);
      middleAd = (googleAds["google_ad.index.middle"]) ? (<GoogleAd googleAd={googleAds["google_ad.index.middle"].value}></GoogleAd>) :(<div></div>);
      bottomAd = (googleAds["google_ad.index.bottom"]) ? (<GoogleAd googleAd={googleAds["google_ad.index.bottom"].value}></GoogleAd>) :(<div></div>);
    }

    return (
      <Layout className="layout" hasSider={false} style={{background: '#ffffff'}}>
        <PopitHeader/>
        <Content style={{ padding: '0 10px', maxWidth: 1360, margin: 'auto auto'}}>
          <div style={{float: 'left', maxWidth: 1040}}>
            <div style={{padding: 15}}>
              <RecentPosts/>
            </div>
            <div style={{textAlign: 'center'}}>
              { topAd }
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
            <div style={{width: 300, marginTop: 15, marginBottom: 15}}>
              { middleAd }
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
              { bottomAd }
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