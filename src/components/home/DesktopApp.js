import React from 'react';
import { Layout } from 'antd';
import RecentPosts from "./RecentPosts";
import TagPostsList from "./TagPostsList";
import AuthorPostsList from "./AuthorPostsList";
import GoogleAd from '../GoogleAd';
import PostApi from "../../services/PostApi";
import PopitHeader from "../PopitHeader";
import PopitFooter from "../PopitFooter";

import '../popit.css';

const { Content, Footer } = Layout;

export default class DesktopApp extends React.Component {
  constructor(props) {
    super(props);

    let googleAds;
    if (process.env.BROWSER) {
      if (window.__INITIAL_DATA__) {
        googleAds = window.__INITIAL_DATA__.data;
      }
      delete window.__INITIAL_DATA__;
    } else {
      if (this.props.staticContext) {
        googleAds = this.props.staticContext.data;
      }
    }
    this.state = {
      googleAds: googleAds,
      loading: googleAds ? false : true,
    };
  }

  componentDidMount() {
    if (!this.state.googleAds) {
      this.setState({
        loading: true,
      });
      PostApi.getGoogleAds('index.desktop')
        .then(json => {
          if (json.success !== true) {
            alert("Error:" + json.message);
            return;
          }

          this.setState({
            loading: false,
            googleAds: json.data,
          });
        })
        .catch(error => {
          alert("Error:" + error);
        });
    }
  };

  render() {
    const { loading, googleAds } = this.state;
    if (loading === true) {
      return <p>Loading...</p>
    }

    let topAd = null;
    let middleAd = null;
    let bottomAd = null;

    // if (googleAds) {
    //   topAd = (googleAds["ad.index.desktop.top"]) ? (
    //     <GoogleAd googleAd={googleAds["ad.index.desktop.top"].value}></GoogleAd>) : (<div></div>);
    //   middleAd = (googleAds["ad.index.desktop.middle"]) ? (
    //     <GoogleAd googleAd={googleAds["ad.index.desktop.middle"].value}></GoogleAd>) : (<div></div>);
    //   bottomAd = (googleAds["ad.index.desktop.bottom"]) ? (
    //     <GoogleAd googleAd={googleAds["ad.index.desktop.bottom"].value}></GoogleAd>) : (<div></div>);
    // }

    return (
      <Layout className="layout" hasSider={false} style={{background: '#ffffff'}}>
        <PopitHeader />
        <Content style={{padding: '0 10px', maxWidth: 1360, margin: 'auto auto'}}>
          <div style={{float: 'left', maxWidth: 1040}}>
            <div style={{padding: 15}}>
              <RecentPosts/>
            </div>
            <div style={{textAlign: 'center'}}>
              {topAd}
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
              {middleAd}
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
              {bottomAd}
            </div>
          </div>
          <div style={{clear: 'both'}}></div>
        </Content>
        <PopitFooter/>
      </Layout>
    );
  }
}