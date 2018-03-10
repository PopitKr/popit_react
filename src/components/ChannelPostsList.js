import React from 'react';
import {Row, Col} from 'antd';

import ChannelPosts from './ChannelPosts';
import PostApi from '../services/PostApi';

export default class ChannelPostsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      termPostsList: [],
    }
  }
  componentDidMount() {
    PostApi.getChannelPosts()
      .then(json => {
        if (json.success !== true) {
          alert("Error:" + json.message);
          return;
        }

        console.log(">>>termPostsList:", json.data);
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
    if (!termPostsList) {
      return (<div></div>);
    }

    const items = termPostsList.map((termPosts, index) => {
      const marginTop = index === 0 ? 10 : 40;
      return (<div key={"channels-" + index} style={{marginTop: marginTop}}><ChannelPosts termPosts={termPosts}/></div>);
    });

    return (
      <div>
        { items }
      </div>
    )
  }
}