import React from 'react';

import FBLoader from './FBLoader';

export default class FBComment extends React.Component {
  constructor() {
    super();

    this.state = {
      fbLoaded: false,
    };
    this.loaded = false;
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.loaded && nextState.fbLoaded && !this.state.fbLoaded) {
      this.loaded = true;
      // sleep: https://davidwalsh.name/javascript-sleep-function
      const sleep = new Promise((resolve) => setTimeout(resolve, 200));
      sleep.then(() => {
        global.window.FB.XFBML.parse(this._scope);
      });
    }
  }

  render() {
    return (
      <div>
        <FBLoader title={this.props.title} onFbLoad={() => this.setState({fbLoaded: true})}>
          <div ref={(s) => this._scope = s}>
            <div className="fb-comments"
                 data-width="100%"
                 data-href={this.props.fbPluginUrl} data-numposts="10">
            </div>
          </div>
        </FBLoader>
      </div>
    );
  }
}