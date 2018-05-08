import React from 'react';
import AuthorPostsPageMobile from './AuthorPostsPageMobile';
import AuthorPostsPageDesktop from './AuthorPostsPageDesktop';

export default class AuthorPostsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isMobile) {
      return (
        <AuthorPostsPageMobile
          authorParam={this.props.match.params.author}
          staticContext={this.props.staticContext}
        />
      )
    } else {
      return (
        <AuthorPostsPageDesktop
          authorParam={this.props.match.params.author}
          staticContext={this.props.staticContext}
        />
      );
    }
  }
}
