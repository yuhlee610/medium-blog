import { IPost } from '@/app/types/common';
import { cache } from 'react';
import sanityClient from './client';

const getAllPosts = cache(async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;

  const posts: [IPost] = await sanityClient.fetch(query);
  return posts;
});

export default getAllPosts;
