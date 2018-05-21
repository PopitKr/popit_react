import React from 'react';
import RecentPostsPageMobile from './RecentPostsPageMobile';
import RecentPostsPageDesktop from './RecentPostsPageDesktop';


export default class RecentPostsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isMobile) {
      return (
        <RecentPostsPageMobile
          pageParam={this.props.match.params.page}
          staticContext={this.props.staticContext}
        />
      )
    } else {
      return (
        <RecentPostsPageDesktop
          pageParam={this.props.match.params.page}
          staticContext={this.props.staticContext}
        />
      );
    }
  }
}