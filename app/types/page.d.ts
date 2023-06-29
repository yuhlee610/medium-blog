import { Image } from "sanity";

export interface IPagePost {
  params: {
    slug: string;
  };
}

export interface ISanityImage extends Image {
    alt: string;
}