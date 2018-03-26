import React from 'react';

import FBLoader from './FBLoader';
import TwitterShare from '../asset/twitter.png';
import LinkedShare from '../asset/linkedin.png';

export default class ShareButton extends React.Component {
  constructor() {
    super();

    this.state = {
      fbLoaded: false,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.fbLoaded && !this.state.fbLoaded) {
      window.FB.XFBML.parse(this._scope);
    }
  }

  shareTwitter = () => {
    const url = `https://www.addtoany.com/add_to/twitter?linkurl=${this.props.url}&linkname=${this.props.title}&linknote=`;
    window.open(url, 'twitter_sharer', 'toolbar=0,status=0,width=800,height=500');
  };

  shareLinkedin = () => {
    const url = `https://www.addtoany.com/add_to/linkedin?linkurl=${this.props.url}&linkname=${this.props.title}&linknote=`;
    window.open(url, 'linkedin_sharer', 'toolbar=0,status=0,width=800,height=500');
  };

  render() {
    return (
      <div>
        <div style={{float: 'left'}}>
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
        <div style={{float: 'left', marginLeft: 5}}>
          <img src={TwitterShare} style={{width: 20, height: 20, marginTop: -3, cursor: 'pointer'}} onClick={this.shareTwitter}/>
        </div>
        <div style={{float: 'left', marginLeft: 5}}>
          <img src={LinkedShare} style={{width: 20, height: 20, marginTop: -3, cursor: 'pointer'}} onClick={this.shareLinkedin}/>
        </div>
        <div style={{clear: 'both'}}/>
      </div>
    );
  }
}