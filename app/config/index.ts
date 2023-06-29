export const sanity = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2023-06-28',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_TOKEN,
};
