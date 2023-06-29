import { IFormInput } from '@/app/types/common';
import sanityClient from './client';

const createComment = async (data: IFormInput) => {
  const { _id, name, email, comment } = data;
  await sanityClient.create({
    _type: 'comment',
    post: {
      _type: 'reference',
      _ref: _id,
    },
    name,
    email,
    comment,
  });
};

export default createComment;