import { Slug } from 'sanity';
import { ISanityImage } from './page';

export interface IPost {
  _id: string;
  title: string;
  description: string;
  slug: Slug;
  mainImage: ISanityImage;
  publishedAt: string;
  author: {
    name: string;
    image: ISanityImage;
  };
  body: object[];
  comments: [IComment];
}

export interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

export interface IComment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
  _createAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updateAt: string;
}

export interface ICommentForm {
  postId: string;
}