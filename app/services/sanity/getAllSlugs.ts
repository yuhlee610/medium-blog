import { IPost } from '@/app/types/common';
import { cache } from 'react';
import sanityClient from './client';

const getAllSlugs = cache(async () => {
  const query = `*[_type == "post"]{
    _id,
    slug
  }`;

  const posts: [IPost] = await sanityClient.fetch(query);
  return posts;
});

export default getAllSlugs;
