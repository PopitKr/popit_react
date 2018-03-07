import React from 'react';

const HttpUtil = {
  handleHttpStatus: (response) => {
    if (response.ok) {
      return response;
    } else {
      throw new Error(response.statusText);
    }
  },
};

export default class PostApi extends React.Component {
  static getApiServer = () => {
    if (process.env.REACT_APP_ENV === 'production') {
      return "http://www.popit.kr";
    } else {
      return "http://127.0.0.1:8000";
    }
  };

  static getRecentPosts = () => {
    const apiPath = `${PostApi.getApiServer()}/api/RecentPosts`;
    return fetch(apiPath, {headers: PostApi.getHeader()})
      .then(HttpUtil.handleHttpStatus)
      .then(res => res.json())
  };

  static getChannelPosts = () => {
    const apiPath = `${PostApi.getApiServer()}/api/ChannelPosts`;
    return fetch(apiPath, {headers: PostApi.getHeader()})
      .then(HttpUtil.handleHttpStatus)
      .then(res => res.json())
  };

  static getRandomAuthorPosts = () => {
    const apiPath = `${PostApi.getApiServer()}/api/RandomAuthorPosts`;
    return fetch(apiPath, {headers: PostApi.getHeader()})
      .then(HttpUtil.handleHttpStatus)
      .then(res => res.json())
  };

  static getHeader = () => {
    return {
      'Content-Type': 'application/json'
    };
  }
}