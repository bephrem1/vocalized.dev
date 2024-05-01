import Environment from '../Environment';

const ogImagePrefix = Environment.isDevelopment(process.env.NODE_ENV)
  ? ''
  : `https://${process.env.NEXT_PUBLIC_HOSTNAME}`;

export const OPEN_GRAPH_IMAGE_URL = {
  SITE: `${ogImagePrefix}/images/open-graph/site-og-image.png`
};
