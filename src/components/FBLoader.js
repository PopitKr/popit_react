import React from 'react';

let fbInjected = false;
let fbLoaded = !!window.FB;

function onFbLoad() {
  fbLoaded = true;
}

export default class FBLoader extends React.Component {
  constructor(props) {
    super(props);

    if (fbLoaded) {
      // Injected and loaded
      if (props.onFbLoad) {
        props.onFbLoad();
      }
    } else {
      // Not yet injected
      fbInjected = true;
      let script = document.createElement('script');
      script.onload = onFbLoad;
      script.src = 'https://connect.facebook.net/es_US/sdk.js#xfbml=1&version=v2.5&appId=131306400631298';
      document.body.appendChild(script);
    }
  }

  render() {
    return React.Children.only(this.props.children);
  }
}