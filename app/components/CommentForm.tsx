'use client';

import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICommentForm, IFormInput } from '../types/common';

const CommentForm = ({ postId }: ICommentForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [submitted, setSubmitted] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setSubmitted(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white">
        <h3 className="text-3xl font-bold">
          Thanks for submitting your comment!
        </h3>
        <p>Once it has been approved, it will appear below!</p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
      <h4 className="text-3xl font-bold">Leave a comment below!</h4>
      <hr className="py-3 mt-2" />

      <input {...register('_id')} type="hidden" name="_id" value={postId} />
      <label className="block mb-5">
        <span className="text-grey-700">Name</span>
        <input
          {...register('name', { required: true })}
          className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
          placeholder="John Wick"
          type="text"
        />
      </label>
      <label className="block mb-5">
        <span className="text-grey-700">Email</span>
        <input
          {...register('email', { required: true })}
          className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
          placeholder="John Wick"
          type="email"
        />
      </label>
      <label className="block mb-5">
        <span className="text-grey-700">Comment</span>
        <textarea
          {...register('comment', { required: true })}
          className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring"
          placeholder="John Wick"
          rows={8}
        />
      </label>

      <div className="flex flex-col p-5">
        {errors.name && <p className="text-red-500">Name is required</p>}
        {errors.email && <p className="text-red-500">Email is required</p>}
        {errors.comment && <p className="text-red-500">Comment is required</p>}
      </div>

      <input
        type="submit"
        className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
      />
    </form>
  );
};

export default CommentForm;
