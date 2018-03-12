import React from 'react';
import {Row, Col} from 'antd';

import TagPosts from './TagPosts';
import PostApi from '../services/PostApi';

export default class TagPostsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      termPostsList: [],
    }
  }
  componentDidMount() {
    PostApi.getTagPosts()
      .then(json => {
        if (json.success !== true) {
          alert("Error:" + json.message);
          return;
        }

        this.setState({
          termPostsList: json.data
        });
      })
      .catch(error => {
        alert("Error:" + error);
      });
  };

  render() {
    const { termPostsList } = this.state;
    if (!termPostsList || termPostsList.length == 0) {
      return (<div></div>);
    }

    const items = termPostsList.map((termPosts, index) => {
      const marginTop = index === 0 ? 10 : 40;
      return (
        <div key={"tags-" + index} style={{marginTop: marginTop}}>
          <TagPosts termPosts={termPosts}/>
        </div>);
    });

    return (
      <div>
        { items }
      </div>
    )
  }
}