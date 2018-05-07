import React from 'react';

if (!process.env.BROWSER) {
  global.window = {};
}

let fbLoaded = !!global.window.FB;
let fbLoading = false;

function onFbLoad() {
  fbLoaded = !!global.window.FB;
}

export default class FBLoader extends React.Component {
  constructor(props) {
    super(props);

    this.fbLoadFinished = false;

    if (!process.env.BROWSER) {
      return;
    }
    if (fbLoaded) {
      // Injected and loaded
      if (props.onFbLoad) {
        props.onFbLoad();
      }
    } else {
      if (fbLoading == true) {
        return;
      }
      fbLoading = true;
      // Not yet injected
      let script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=131306400631298&autoLogAppEvents=1';
      script.onload = onFbLoad;
      document.body.appendChild(script);
      console.log("==> fbLoaded load");
    }
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
