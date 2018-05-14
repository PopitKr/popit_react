import React from 'react';
import { Link } from 'react-router-dom';
import PostApi from "../../services/PostApi";
import { Layout } from 'antd';
import PopitMobileHeader from "../PopitMobileHeader";
import PopitMobileSider from "../PopitMobileSider";
import PopitFooter from "../PopitFooter";

import '../popit.css';
import PostCardListMobile from "./PostCardListMobile";

const { Content } = Layout;

const MAX_NUM_POSTS = 10;

export default class AuthorPostsPage extends React.Component {
  constructor(props) {
    super(props);

    let posts;
    let author;

    if (process.env.BROWSER) {
      if (window.__INITIAL_DATA__) {
        posts = window.__INITIAL_DATA__.data.posts;
        author = window.__INITIAL_DATA__.data.author;
      }
      delete window.__INITIAL_DATA__;
    } else {
      posts = this.props.staticContext.data.data.posts;
      author = this.props.staticContext.data.data.author;
    }
    this.state = {
      posts: posts,
      author: author,
      errorMessage: "",
    };
    this.page = posts ? 1 : 0;

    this.getAuthorPosts = this.getAuthorPosts.bind(this);
  }

  componentDidMount () {
    if (!this.state.posts) {
      this.getAuthorPosts()
    }
  }

  getAuthorPosts() {
    this.page++;
    PostApi.getPostsByAuthor(this.props.authorParam, [], this.page, MAX_NUM_POSTS)
      .then(json => {
        if (json.success !== true) {
          this.setState({
            errorMessage: json.message,
            posts: [],
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
          posts: mergedPosts,
          author: json.data.author,
        });
      })
      .catch(error => {
        alert("Error:" + error);
      });
  };


  render() {
    const { posts, author, errorMessage } = this.state;

    if (!author) {
      return (<div style={{textAlign: 'center', marginTop: 20}}>Loading...</div>);
    }

    return (
      <Layout className="layout" style={{background: '#ffffff'}}>
        <PopitMobileSider />
        <Layout>
          <PopitMobileHeader/>
          <Content style={{ padding: '10px', marginTop: 84}}>
            <div>
              {
                (author.userUrl)
                  ?
                  (<h1><a href={author.userUrl} target="_blank"><img src={author.avatar} className="author_avatar"/> {author.displayName}({author.userLogin})</a></h1>)
                  :
                  (<h1><img src={author.avatar} className="author_avatar"/> {author.displayName}({author.userLogin})</h1>)
              }
              { (errorMessage) ? (<div style={{fontWeight: 'bold', fontSize: 16}}>Error: {errorMessage}</div>) : null }

              <PostCardListMobile posts={posts}
                                  moreButtonText={author.displayName + '님 글 더보기'}
                                  getNextPosts={this.getAuthorPosts}
                                  showAuthor={false}
              />
            </div>
          </Content>
          <PopitFooter/>
        </Layout>
      </Layout>
    )
  }
}
