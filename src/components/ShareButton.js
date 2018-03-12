import React from 'react';

import FBLoader from './FBLoader';

export default class ShareButton extends React.Component {
  constructor() {
    super();

    this.state = {
      fbLoaded: false,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.fbLoaded && !this.state.fbLoaded) {
      try {
        window.FB.XFBML.parse(this._scope);
      } catch (error) {
        console.log(">>>>>error:", error);
      };
    }
  }

  render() {
    return (
      <div>
        <FBLoader title={this.props.title} onFbLoad={() => this.setState({fbLoaded: true})}>
          <div ref={(s) => this._scope = s}>
            <div className="fb-like"
                 data-href={this.props.url}
                 data-width="100"
                 data-layout="button_count"
                 data-action="like"
                 data-size="small"
                 data-show-faces="false"
                 data-colorscheme="dark"
                 data-share="true">
            </div>
          </div>
        </FBLoader>
      </div>
    );
  }
}