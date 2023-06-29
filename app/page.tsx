import Image from 'next/image';
import Link from 'next/link';
import sanitySdk from './services/sanity'

export default async function Home() {
  const posts = await sanitySdk.getAllPosts();

  return (
    <main className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{' '}
            is a place to write, read and connect
          </h1>
          <h2>
            It&apos;s easy and free to post your thinking on any topic and
            connect with millions of readers.
          </h2>
        </div>
        <Image
          className="hidden md:inline-flex h-80 lg:h-full"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt="Medium logo"
          width={500}
          height={500}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => {
          const {
            _id: id,
            title,
            description,
            slug,
            mainImage,
            author: { name, image },
          } = post;
          return (
            <Link key={id} href={`/post/${slug.current}`}>
              <div className="group cursor-pointer border rounded-lg overflow-hidden">
                <div className="relative w-full h-72 group-hover:scale-105 transition-transform duration-200 ease-in-out">
                  <Image
                    className="object-cover"
                    src={sanitySdk.urlBuilder(mainImage).url()}
                    alt={mainImage.alt}
                    fill
                  />
                </div>

                <div className="flex justify-between p-5 bg-white">
                  <div className="w-5/6">
                    <p className="text-lg font-bold">{title}</p>
                    <p className="text-xs">
                      {description} by {name}
                    </p>
                  </div>

                  <Image
                    className="rounded-full h-12 w-12"
                    src={sanitySdk.urlBuilder(image).url()}
                    alt={image.alt}
                    width={48}
                    height={48}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
