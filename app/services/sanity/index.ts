import getAllPosts from './getAllPosts';
import urlBuilder from './urlBuilder';
import getAllSlugs from './getAllSlugs';
import getPostBySlug from './getPostBySlug';
import createComment from './createComment';

const sanitySdk = {
  getAllPosts,
  urlBuilder,
  getAllSlugs,
  getPostBySlug,
  createComment,
};

export default sanitySdk;