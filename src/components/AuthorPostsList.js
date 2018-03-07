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

        console.log(">>>authorPostsList:", json.data);
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

    const items = [];

    authorPostsList.forEach((authorPosts, index) => {
      const marginTop = index == 0 ? 0 : 20;
      items.push(<div style={{marginTop: marginTop}}><AuthorPosts authorPosts={authorPosts}/></div>);
    });

    return (
      <div>
        { items }
      </div>
    )
  }
}