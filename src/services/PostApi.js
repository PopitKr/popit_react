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
    if (process.env.NODE_ENV === 'production') {
      return "http://www.popit.kr";
    } else {
      return "http://127.0.0.1:8000";
    }
  };

  static getRecentPosts = (page, pageSize) => {
    const apiPath = `${PostApi.getApiServer()}/api/RecentPosts?page=${page}&size=${pageSize}`;
    return fetch(apiPath, {headers: PostApi.getHeader()})
      .then(HttpUtil.handleHttpStatus)
      .then(res => res.json())
  };

  static getTagPosts = () => {
    const apiPath = `${PostApi.getApiServer()}/api/TagPosts`;
    return fetch(apiPath, {headers: PostApi.getHeader()})
      .then(HttpUtil.handleHttpStatus)
      .then(res => res.json())
  };

  static getPostsByTag = (tagId, excludePostIds, page, pageSize) => {
    const apiPath = `${PostApi.getApiServer()}/api/PostsByTag?tag=${tagId}&page=${page}&size=${pageSize}&excludes=${excludePostIds}`;
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

  static getPostsByAuthor = (authorId, excludePostIds, page, pageSize) => {
    const apiPath = `${PostApi.getApiServer()}/api/PostsByAuthor?id=${authorId}&page=${page}&size=${pageSize}&excludes=${excludePostIds}`;
    return fetch(apiPath, {headers: PostApi.getHeader()})
      .then(HttpUtil.handleHttpStatus)
      .then(res => res.json())
  };

  static getGoogleAds = () => {
    const apiPath = `${PostApi.getApiServer()}/api/GetGoogleAd`;
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