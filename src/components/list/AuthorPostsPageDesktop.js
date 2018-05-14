import React from 'react';
import PostApi from "../../services/PostApi";
import PostCardList from './PostCardList';
import { Layout } from 'antd';
import PopitHeader from "../PopitHeader";
import PopitFooter from "../PopitFooter";

import '../popit.css';

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
      <Layout className="layout" hasSider={false} style={{background: '#ffffff'}}>
        <PopitHeader />
        <Content style={{padding: '20px 10px', maxWidth: 1360, margin: '74px auto auto auto'}}>
          <div style={{width: 900}}>
            {
              (author.userUrl)
                ?
                (<h1>
                  <img src={author.avatar} className="author_avatar"/> {author.displayName}({author.userLogin})
                  <span className="author_home" style={{fontSize: 20}}><a href={author.userUrl} target="_blank">{author.userUrl}</a></span>
                </h1>)
                :
                (<h1><img src={author.avatar} className="author_avatar"/> {author.displayName}({author.userLogin})</h1>)
            }
            { (errorMessage) ? (<div style={{fontWeight: 'bold', fontSize: 16}}>Error: {errorMessage}</div>) : null }
            <PostCardList posts={posts}
                          getNextPosts={this.getAuthorPosts}/>
          </div>
        </Content>
        <PopitFooter/>
      </Layout>
    )
  }
}
