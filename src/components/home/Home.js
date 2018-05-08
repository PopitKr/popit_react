import React from 'react';

import DesktopApp from './DesktopApp';
import MobileApp from './MobileApp';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.isMobile ? (<MobileApp/>) : (<DesktopApp/>);
  }
}