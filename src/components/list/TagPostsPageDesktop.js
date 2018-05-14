import React from 'react';
import PostApi from "../../services/PostApi";
import PostCardList from './PostCardList';
import { Layout } from 'antd';
import PopitHeader from "../PopitHeader";
import PopitFooter from "../PopitFooter";

import '../popit.css';

const { Content } = Layout;

const MAX_NUM_POSTS = 10;

export default class TagPostsPageDesktop extends React.Component {
  constructor(props) {
    super(props);

    let posts;
    if (process.env.BROWSER) {
      if (window.__INITIAL_DATA__) {
        posts = window.__INITIAL_DATA__.data;
      }
      delete window.__INITIAL_DATA__;
    } else {
      posts = this.props.staticContext.data.data;
    }
    this.state = {
      posts: posts,
      loading: posts ? false : true,
      errorMessage: "",
    };
    this.page = posts ? 1 : 0;

    this.getTagPosts = this.getTagPosts.bind(this);
  }

  componentDidMount () {
    if (!this.state.posts) {
      this.getTagPosts(this.props.tagParam)
    }
  }

  getTagPosts() {
    this.page++;
    PostApi.getPostsByTag(this.props.tagParam, [], this.page, MAX_NUM_POSTS)
      .then(json => {
        if (json.success !== true) {
          this.setState({
            loading: false,
            errorMessage: json.message,
            posts: [],
          });
          // alert("Error:" + json.message);
          return;
        }

        const posts = json.data;
        if (posts.length == 0) {
          this.page--;
          alert("마지막 글 입니다.");
          return;
        }

        const mergedPosts = (this.state.posts) ? ([...this.state.posts, ...posts]) : posts
        this.setState({
          loading: false,
          posts: mergedPosts,
        });
      })
      .catch(error => {
        alert("Error:" + error);
      });
  };


  render() {
    const { loading, posts, errorMessage } = this.state;

    if (loading === true) {
      return (<div>Loading...</div>)
    }

    return (
      <Layout className="layout" hasSider={false} style={{background: '#ffffff'}}>
        <PopitHeader />
        <Content style={{padding: '20px 10px', maxWidth: 1360, margin: '74px auto auto auto'}}>
          <div style={{width: 900}}>
            <h1>{this.props.tagParam.toUpperCase()}</h1>
            { (errorMessage) ? (<div style={{fontWeight: 'bold', fontSize: 16}}>Error: {errorMessage}</div>) : null }
            <PostCardList posts={posts}
                          getNextPosts={this.getTagPosts}
                          showAuthor={true}/>
          </div>
        </Content>
        <PopitFooter/>
      </Layout>
    )
  }
}