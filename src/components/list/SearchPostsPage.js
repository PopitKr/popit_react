import React from 'react';
import SearchPostsPageMobile from './SearchPostsPageMobile';
import SearchPostsPageDesktop from './SearchPostsPageDesktop';


export default class SearchPostsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isMobile) {
      return (
        <SearchPostsPageMobile
          keywordParam={this.props.match.params.keyword}
          staticContext={this.props.staticContext}
        />
      )
    } else {
      return (
        <SearchPostsPageDesktop
          keywordParam={this.props.match.params.keyword}
          staticContext={this.props.staticContext}
        />
      );
    }
  }
}