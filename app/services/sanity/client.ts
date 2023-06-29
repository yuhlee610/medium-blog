import { createClient } from 'next-sanity';
import { sanity } from '../../config';

const sanityClient = createClient(sanity);

export default sanityClient;
