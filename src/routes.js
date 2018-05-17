import Home from './components/home/Home';
import SinglePostPage from './components/detail/SinglePostPage';
import TagPostsPage from './components/list/TagPostsPage';
import CategoryPostsPage from './components/list/CategoryPostsPage';
import PostApi from './services/PostApi';
import AuthorPostsPage from "./components/list/AuthorPostsPage";
import SearchPostsPage from './components/list/SearchPostsPage';

const PUBLIC_PATH = '';

const routes =  [
  {
    path: PUBLIC_PATH + '/',
    exact: true,
    component: Home,
  }, {
    path: PUBLIC_PATH + '/search/:keyword',
    component: SearchPostsPage,
    fetchInitialData: (req) => {
      const keyword = req.path.split('/').pop();
      return PostApi.searchPosts(keyword, 1);
    }
  }, {
    path: PUBLIC_PATH + '/tag/:tag',
    component: TagPostsPage,
    fetchInitialData: (req) => {
      const tagParam = req.path.split('/').pop();
      return PostApi.getPostsByTag(tagParam, [], 1, 10);
    }
  }, {
    path: PUBLIC_PATH + '/category/:category',
    component: CategoryPostsPage,
    fetchInitialData: (req) => {
      const categoryParam = req.path.split('/').pop();
      return PostApi.getPostsByCategory(categoryParam, [], 1, 10);
    }
  }, {
    path: PUBLIC_PATH + '/author/:author',
    component: AuthorPostsPage,
    fetchInitialData: (req) => {
      const authorParam = req.path.split('/').pop();
      return PostApi.getPostsByAuthor(authorParam, [], 1, 10);
    }
  }, {
    path: PUBLIC_PATH + '/post/:id',
    component: SinglePostPage,
    fetchInitialData: (req) => {
      const id = req.path.split('/').pop();
      return PostApi.getPostById(id);
    }
  }, {
    path: PUBLIC_PATH + '/:permalink/',
    component: SinglePostPage,
    fetchInitialData: (req) => {
      const tokens = req.path.split('/');
      if (tokens.length < 2) {
        return Promise.resolve();
      }
      if (tokens[1] === "favicon.ico") {
        return Promise.resolve();
      }
      if (tokens[1] === "/wp-admin" ||
        tokens[1] === "/wp-content" ||
        tokens[1] === "/wp-login" ||
        tokens[1] === "/wp-includes" ||
        tokens[1] === "/rss" ||
        tokens[1] === "/feed") {
        return Promise.resolve();
      }
      if (req.query.preview) {
        return PostApi.getPostById(req.query.p);
      } else {
        return PostApi.getPostByPermalink(tokens[1]);
      }
    }
  }
];

export { routes, PUBLIC_PATH }