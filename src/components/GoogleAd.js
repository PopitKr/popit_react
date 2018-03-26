import React from 'react';

export default class GoogleAd extends React.Component {
  componentDidMount() {
    // (window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={ {__html: this.props.googleAd} }>
      </div>
    );
    // return(
    //   <ins className="adsbygoogle"
    //        style={this.props.adStyle}
    //        data-ad-client="ca-pub-9913849834747247"
    //        data-ad-slot={this.props.slot}
    //        data-ad-format="auto">
    //   </ins>
    // );
  }
}
