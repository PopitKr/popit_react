import React from 'react';
import { Layout, Menu, Icon, Input, Row, Col, Button } from 'antd';
import MobilePost from "./MobilePost";
import GoogleAd from '../GoogleAd';
import PostApi from "../../services/PostApi";

// import popitLogo from '../../asset/popit_logo.png';
import '../popit.css';

const Search = Input.Search;
const { Header, Content, Footer, Sider } = Layout;

export default class MobileApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      googleAds: null,
      recentPosts: [],
      authorPosts: [],
      tagPosts: [],
      moreRecentPosts: [],
    };
    this.page = 0;
  };

  componentDidMount() {
    this.getGoogleAd();
    this.getRecentPosts(false);
    this.getAuthorPosts();
    this.getTagPosts();
  };

  getGoogleAd() {
    PostApi.getGoogleAds('index.mobile')
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

  getRecentPosts(moreButtonClicked) {
    this.page++;
    PostApi.getRecentPosts(this.page, 5)
      .then(json => {
        if (json.success !== true) {
          alert("Error:" + json.message);
          return;
        }

        if (moreButtonClicked) {
          this.setState({
            moreRecentPosts: this.state.moreRecentPosts.concat(json.data)
          });
        } else {
          this.setState({
            recentPosts: json.data
          });
        }
      })
      .catch(error => {
        alert("Error:" + error);
      });
  };

  getAuthorPosts() {
    PostApi.getRandomAuthorPosts(true)
      .then(json => {
        if (json.success !== true) {
          alert("Error:" + json.message);
          return;
        }

        this.setState({
          authorPosts: json.data
        });
      })
      .catch(error => {
        alert("Error:" + error);
      });
  };

  getTagPosts() {
    PostApi.getTagPosts(true)
      .then(json => {
        if (json.success !== true) {
          alert("Error:" + json.message);
          return;
        }

        this.setState({
          tagPosts: json.data
        });
      })
      .catch(error => {
        alert("Error:" + error);
      });
  };

  search(keyword) {
    document.location.href = `http://www.popit.kr?s=${keyword}`;
  };

  nextRecentPosts() {
    this.getRecentPosts(true);
  };

  clickSideMenu(item) {
    if (item.key === "1") {
      document.location.href = "http://www.popit.kr/wp-admin/";
    } else if (item.key === "2") {
      document.location.href = "http://www.popit.kr/how-to-contribute/";
    } else if (item.key === "3") {
      document.location.href = "http://www.popit.kr/category/%ea%b3%b5%ec%a7%80%ec%82%ac%ed%95%ad/";
    }
  };

  render() {
    const { googleAds, recentPosts, authorPosts, tagPosts, moreRecentPosts } = this.state;

    const popitLogo = require('../../asset/popit_logo.png');

    const logoStyle = {
      /*background: rgba(255,255,255,.2);*/
      backgroundImage: `url(${popitLogo})`,
      margin: '16px 24px 16px 0',
      width: 79,
      height: 32,
      float: 'left',
      cursor: 'pointer'
    };

    let mobileAds = [];

    if (googleAds) {
      mobileAds.push((googleAds["ad.index.mobile.top"]) ? (
        <GoogleAd googleAd={googleAds["ad.index.mobile.top"].value}></GoogleAd>) : (<div></div>));
      mobileAds.push((googleAds["ad.index.mobile.middle"]) ? (
        <GoogleAd googleAd={googleAds["ad.index.mobile.middle"].value}></GoogleAd>) : (<div></div>));
      mobileAds.push((googleAds["ad.index.mobile.bottom"]) ? (
        <GoogleAd googleAd={googleAds["ad.index.mobile.bottom"].value}></GoogleAd>) : (<div></div>));
    }

    let cardItems = [];
    let cardItemIndex = 0;
    if (mobileAds.length > 0) {
      cardItems.push(<div key={cardItemIndex++}>{mobileAds[0]}</div>);
    }
    recentPosts.forEach((post, index) => {
      if (index == 0) {
        cardItems.push(
          <div key={cardItemIndex++}><h2 style={{fontWeight: 'bold'}}>최신글</h2></div>
        )
      }
      cardItems.push(
        <MobilePost key={cardItemIndex++}
                    index={index}
                    post={post}
        />
      );
    });

    if (mobileAds.length > 1) {
      cardItems.push(<div key={cardItemIndex++}>{mobileAds[1]}</div>);
    }

    authorPosts.forEach((eachAuthorPost, index) => {
      const author = eachAuthorPost.author;
      const authorPostsLink = `http://www.popit.kr/author/${author.userLogin}`;

      cardItems.push(
        <div key={cardItemIndex++} style={{marginTop: 20}}>
          <h2 style={{fontWeight: 'bold'}}>
            <span style={{fontSize: 16, color: 'gray', marginRight: 10}}>저자</span><a className="author_title" href={authorPostsLink}>{author.displayName}</a>
          </h2>
        </div>
      );

      eachAuthorPost.posts.forEach((post, authorPostIndex) => {
        cardItems.push(
          <MobilePost key={cardItemIndex++}
                      index={authorPostIndex}
                      post={post}
          />
        );
      });
    });

    if (mobileAds.length > 2) {
      cardItems.push(<div key={cardItemIndex++}>{mobileAds[2]}</div>);
    }

    tagPosts.forEach((eachTagPost, index) => {
      const term = eachTagPost.term;
      const termLink = `http://www.popit.kr/tag/${term.name}`;

      cardItems.push(
        <div key={cardItemIndex++} style={{marginTop: 20}}>
          <h2 style={{fontWeight: 'bold'}}>
            <span style={{fontSize: 16, color: 'gray', marginRight: 10}}>Tag</span><a className="author_title" href={termLink}>{term.name}</a>
          </h2>
        </div>
      );

      eachTagPost.posts.forEach((post, tagPostIndex) => {
        cardItems.push(
          <MobilePost key={cardItemIndex++}
                      index={tagPostIndex}
                      post={post}
          />
        );
      });
    });

    // Facebook page like
    cardItems.push(
      <div key={cardItemIndex++} style={{marginTop: 20}}>
        <div className="fb-page"
             data-href="https://www.facebook.com/popitkr"
             small_header="true"
             data-hide-cover="false"
             adapt_container_width="false"
             data-show-facepile="true">
        </div>
      </div>
    );

    let morePosts = [];

    moreRecentPosts.forEach((post, index) => {
      morePosts.push(
        <MobilePost key={cardItemIndex++}
                    index={index + 1}
                    post={post}
        />
      );
    });

    return (
      <Layout className="layout" style={{background: '#ffffff'}}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
          <Menu theme="dark" mode="inline" onClick={this.clickSideMenu}>
            <Menu.Item key="1">
              <Icon type="setting" />
              <span className="nav-text">로그인</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="edit" />
              <span className="nav-text">저자신청</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="sound" />
              <span className="nav-text">공지사항</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ paddingLeft: 20, width: '100%'}}>
            <div>
              <div style={logoStyle} onClick={() => {document.location.href = "/v2"}}/>
              <div style={{marginLeft: 20, float: 'left'}}>
                <Search
                  placeholder="Search"
                  onSearch={value => this.search(value)}
                  style={{ width: 150 }}
                />
              </div>
            </div>
          </Header>
          <Content style={{ padding: '10px', marginTop: 64}}>
            {cardItems}
            {morePosts}
            <div style={{marginTop: 10}}>
              <div
                onClick={this.nextRecentPosts}
                style={{cursor: 'pointer', textAlign: 'center', background: '#ffffff', borderRadius: 10, height: 40, lineHeight: '40px', fontSize: 18, fontWeight: 'bold'}}>
                최신글 더보기
              </div>
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            Copyright© popit.kr<br/>
            popit.kr에 등록된 모든 글의 저작권은 저작자에 있으며popit.kr은 사용권만 가지고 있습니다.
          </Footer>
        </Layout>
      </Layout>
    )
  }
}