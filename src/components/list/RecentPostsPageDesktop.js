import React from 'react';
import { Redirect } from 'react-router-dom';
import PostApi from "../../services/PostApi";
import PostCardList from './PostCardList';
import { Layout, Pagination } from 'antd';
import PopitHeader from "../PopitHeader";
import PopitFooter from "../PopitFooter";

import '../popit.css';

const { Content } = Layout;

const MAX_NUM_POSTS = 10;

export default class RecentPostsPageDesktop extends React.Component {
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
    this.page = parseInt(this.props.pageParam, 10);
    this.getRecentPosts = this.getRecentPosts.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
  }

  componentDidMount () {
    if (!this.state.posts) {
      this.getRecentPosts(this.page);
    }
  }

  getNextPage(page) {
    document.location.href = '/page/' + page;
  }

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

        this.setState({
          loading: false,
          posts: json.data.posts,
          totalRecords: json.data.total,
        });
      })
      .catch(error => {
        alert("Error:" + error);
      });
  };


  render() {
    const { loading, posts, errorMessage, totalRecords } = this.state;

    if (loading === true) {
      return (<div>Loading...</div>)
    }

    return (
      <Layout className="layout" hasSider={false} style={{background: '#ffffff'}}>
        <PopitHeader />
        <Content style={{padding: '20px 10px', maxWidth: 1360, margin: '74px auto auto auto'}}>
          <div style={{width: 900, float: 'left'}}>
            <h1>전체글</h1>
            { (errorMessage) ? (<div style={{fontWeight: 'bold', fontSize: 16}}>Error: {errorMessage}</div>) : null }
            <PostCardList posts={posts}
                          showAuthor={true}/>
            <Pagination current={this.page} total={totalRecords} onChange={this.getNextPage}/>
          </div>
          <div style={{ width: 310, marginLeft: 20, float: 'left'}}>
            <div style={{marginTop: 10}}>
              <div className="fb-page"
                   data-href="https://www.facebook.com/popitkr"
                   data-width="300"
                   data-height="200"
                   small_header="true"
                   data-hide-cover="false"
                   adapt_container_width="false"
                   data-show-facepile="true"
              />
            </div>
          </div>
          <div style={{clear: 'both'}}/>
        </Content>
        <PopitFooter/>
      </Layout>
    )
  }
}