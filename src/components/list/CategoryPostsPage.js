import React from 'react';
import CategoryPostsPageMobile from './CategoryPostsPageMobile';
import CategoryPostsPageDesktop from './CategoryPostsPageDesktop';


export default class CategoryPostsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isMobile) {
      return (
        <CategoryPostsPageMobile
          categoryParam={this.props.match.params.category}
          staticContext={this.props.staticContext}
        />
      )
    } else {
      return (
        <CategoryPostsPageDesktop
          categoryParam={this.props.match.params.category}
          staticContext={this.props.staticContext}
        />
      );
    }
  }
}