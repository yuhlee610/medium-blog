import { IPost } from '@/app/types/common';
import { cache } from 'react';
import sanityClient from './client';

const getPostBySlug = cache(async (slug: string) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    publishedAt,
    title,
    author -> {
      name,
      image
    },
    'comments': *[
      _type == "comment" &&
      post._ref == ^._id &&
      approved == true],
    description,
    mainImage,
    slug,
    body,
  }`;

  const post: IPost = await sanityClient.fetch(query, {
    slug,
  });
  return post;
});

export default getPostBySlug;
