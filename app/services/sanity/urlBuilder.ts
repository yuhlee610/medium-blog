import createImageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import sanityClient from './client';

const urlBuilder = (source: SanityImageSource) =>
  createImageUrlBuilder(sanityClient).image(source);

export default urlBuilder;
