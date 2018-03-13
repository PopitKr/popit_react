import React from 'react';

class GoogleAd extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    const style = {
      display: 'block',
    };

    return(
      <ins className="adsbygoogle"
           style={style}
           data-ad-client="ca-pub-9913849834747247"
           data-ad-slot={this.props.slot}
           data-ad-format="auto">
      </ins>
    );
  }
}
