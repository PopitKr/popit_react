import React from 'react';
import {Row, Col} from 'antd';

import AuthorPosts from './AuthorPosts';
import PostApi from '../services/PostApi';

export default class AuthorPostsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authorPostsList: [],
    }
  }
  componentDidMount() {
    PostApi.getRandomAuthorPosts()
      .then(json => {
        if (json.success !== true) {
          alert("Error:" + json.message);
          return;
        }

        this.setState({
          authorPostsList: json.data
        });
      })
      .catch(error => {
        alert("Error:" + error);
      });
  };

  render() {
    const { authorPostsList } = this.state;
    if (!authorPostsList) {
      return (<div></div>);
    }

    const items = authorPostsList.map((authorPosts, index) => {
      const marginTop = index === 0 ? 10 : 40;
      const hrTag = index >= 10 ? (<hr/>) : (<div></div>);
      return (
        <div key={"authorlist-" + index} style={{marginTop: marginTop}}>
          { hrTag }
          <AuthorPosts authorPosts={authorPosts}/>
        </div>
      );
    });

    return (
      <div>
        { items }
      </div>
    )
  }
}