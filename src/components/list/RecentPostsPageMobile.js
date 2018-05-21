import React from 'react';
import PostApi from "../../services/PostApi";
import PostCardListMobile from './PostCardListMobile';
import { Layout } from 'antd';
import PopitMobileHeader from "../PopitMobileHeader";
import PopitMobileSider from "../PopitMobileSider";
import PopitFooter from "../PopitFooter";

import '../popit.css';

const { Content, Footer } = Layout;

const MAX_NUM_POSTS = 10;

export default class RecentPostsPageMobile extends React.Component {
  constructor(props) {
    super(props);

    let posts;
    let totalRecords = 0;
    if (process.env.BROWSER) {
      if (window.__INITIAL_DATA__) {
        posts = window.__INITIAL_DATA__.data.posts;
        totalRecords = window.__INITIAL_DATA__.data.total;
      }
      delete window.__INITIAL_DATA__;
    } else {
      posts = this.props.staticContext.data.posts;
      totalRecords = this.props.staticContext.data.total;
    }
    this.state = {
      posts: posts,
      totalRecords: totalRecords,
      loading: posts ? false : true,
      errorMessage: "",
    };
    this.page = this.props.pageParam;
    this.getRecentPosts = this.getRecentPosts.bind(this);
    this.getNextPosts = this.getNextPosts.bind(this);
  }

  componentDidMount () {
    if (!this.state.posts) {
      this.getRecentPosts(this.page);
    }
  }

  getNextPosts() {
    this.page++;
    this.getRecentPosts(this.page);
  };

  getRecentPosts(page) {
    PostApi.getRecentPosts(page, MAX_NUM_POSTS, true)
      .then(json => {
        if (json.success !== true) {
          this.setState({
            loading: false,
            errorMessage: json.message,
            posts: [],
            totalRecords: 0,
          });
          return;
        }

        const posts = json.data.posts;
        if (posts.length == 0) {
          this.page--;
          alert("마지막 글 입니다.");
          return;
        }

        const mergedPosts = (this.state.posts) ? ([...this.state.posts, ...posts]) : posts;
        this.setState({
          loading: false,
          posts: mergedPosts,
          totalRecords: json.data.total,
        });
      })
      .catch(error => {
        alert("Error:" + error);
      });
  };


  render() {
    const { loading, posts, errorMessage } = this.state;

    if (loading === true) {
      return (<div style={{textAlign: 'center', marginTop: 20}}>Loading...</div>)
    }

    return (
      <Layout className="layout" hasSider={false} style={{background: '#ffffff'}}>
        <PopitMobileSider />
        <Layout>
          <PopitMobileHeader/>
          <Content style={{ padding: '10px', marginTop: 84}}>
            <div>
              <h1>전체글</h1>
              { (errorMessage) ? (<div style={{fontWeight: 'bold', fontSize: 16}}>Error: {errorMessage}</div>) : null }
              <PostCardListMobile posts={posts}
                                  moreButtonText={'더보기'}
                                  getNextPosts={this.getNextPosts}
                                  showAuthor={true}/>
            </div>
          </Content>
          <PopitFooter/>
        </Layout>
      </Layout>
    )
  }
}