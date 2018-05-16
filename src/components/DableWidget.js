import React from 'react';

export default class DableWidget extends React.Component {
  componentDidMount() {
    // (window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    const { widgetId } = this.props;

    const html = `
      <div id="dablewidget_${widgetId}" data-widget_id="${widgetId}">
        <script>
          (function(d,a){d[a]=d[a]||function(){(d[a].q=d[a].q||[]).push(arguments)};}(window,'dable'));
          dable('renderWidget', 'dablewidget_${widgetId}');
        </script>
      </div>
    `;

    return (
      <div style={{marginTop: 10, marginBottom: 10}}>
        <div dangerouslySetInnerHTML={ {__html: html} }>
        </div>
      </div>
    );
  }
}