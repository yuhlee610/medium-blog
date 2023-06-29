import React from 'react';
import { notFound } from 'next/navigation';
import { IPagePost } from '@/app/types/page';
import Image from 'next/image';
import PortableText from 'react-portable-text';
import { sanity } from '@/app/config';
import Link from 'next/link';
import sanitySdk from '@/app/services/sanity';
import CommentForm from '@/app/components/CommentForm';

export const revalidate = 60;

export async function staticParams() {
  const posts = await sanitySdk.getAllSlugs();

  return posts.map((post) => ({ slug: post.slug.current }));
}

// fix "dynamic server usage" errors in dev mode by turning off static generation and forcing dynamic rendering
export const generateStaticParams =
  process.env.NODE_ENV === 'production' ? staticParams : undefined;
export const dynamic =
  process.env.NODE_ENV === 'production' ? 'auto' : 'force-dynamic';

const Post = async (props: IPagePost) => {
  const {
    params: { slug },
  } = props;
  const post = await sanitySdk.getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const {
    mainImage,
    title,
    description,
    author: { name, image: avatar },
    publishedAt,
    body,
    _id,
  } = post;

  return (
    <main>
      <div className="relative w-full h-40">
        <Image
          className="object-cover"
          src={sanitySdk.urlBuilder(mainImage).url()}
          alt={mainImage.alt}
          fill
        />
      </div>

      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">{title}</h1>
        <h2 className="text-xl font-light text-grey-500 mb-2">{description}</h2>

        <div className="flex items-center space-x-2">
          <Image
            src={sanitySdk.urlBuilder(avatar).url()}
            alt={avatar.alt}
            width={48}
            height={48}
            className="rounded-full h-12"
          />

          <p className="font-extralight text-sm">
            Blog post by <span className="text-green-600">{name}</span> -
            Published at {new Date(publishedAt!).toLocaleString()}
          </p>
        </div>

        <div className="mt-10">
          <PortableText
            dataset={sanity.dataset}
            projectId={sanity.projectId}
            content={body!}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="text-xl font-bold my-5" {...props} />
              ),
              li: ({ children }: { children: React.ReactNode }) => (
                <li className="text-2xl font-bold my-5" {...props} />
              ),
              link: ({
                href,
                children,
              }: {
                href: string;
                children: React.ReactNode;
              }) => (
                <Link href={href} className="text-blue-500 hover:underline">
                  {children}
                </Link>
              ),
            }}
          />
        </div>
      </article>

      <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />

      <CommentForm postId={_id} />

      <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2'>
        <h3 className='text-4xl'>Comments</h3>
        <hr className='pb-2' />

        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <span className='text-yellow-500'>{comment.name}:  </span>{comment.comment}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Post;
