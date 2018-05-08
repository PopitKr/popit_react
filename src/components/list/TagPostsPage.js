import React from 'react';
import TagPostsPageMobile from './TagPostsPageMobile';
import TagPostsPageDesktop from './TagPostsPageDesktop';


export default class TagPostsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isMobile) {
      return (
        <TagPostsPageMobile
          tagParam={this.props.match.params.tag}
          staticContext={this.props.staticContext}
        />
      )
    } else {
      return (
        <TagPostsPageDesktop
          tagParam={this.props.match.params.tag}
          staticContext={this.props.staticContext}
        />
      );
    }
  }
}