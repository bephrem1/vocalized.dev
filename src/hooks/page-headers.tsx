import { NextRouter, useRouter } from 'next/router';

import { Empty } from '../types/empty';
import { OPEN_GRAPH_IMAGE_URL } from '../helpers/open-graph';
import React from 'react';
import { getCurrentUrl } from '../helpers/urls';
import { isEmpty } from '../helpers/empty';

export interface OpenGraphData {
  imageUrl: string | Empty;
  title: string | Empty;
  description: string | Empty;
}

interface PageMetadata {
  openGraphData: OpenGraphData;
  canonicalUrl: (router: NextRouter) => string;
}

const metaDefaults: PageMetadata = {
  openGraphData: {
    title: 'Vocalized | A Home for Voice AI Developers.',
    description:
      'Vocalized is a home for Voice AI developers. We share resources, tutorials, and best practices for building voice AI applications.',
    imageUrl: OPEN_GRAPH_IMAGE_URL.SITE
  },
  canonicalUrl: (router: NextRouter) => getCurrentUrl(router)
};

export const useDocumentHeadComponents = ({
  title,
  description,
  imageUrl
}: {
  title?: string;
  description?: string;
  imageUrl?: string;
}) => {
  const router = useRouter();

  const _title = !isEmpty(title) ? title : metaDefaults.openGraphData.title;
  const _description = !isEmpty(description) ? description : metaDefaults.openGraphData.description;
  const _imageUrl = !isEmpty(imageUrl) ? imageUrl : metaDefaults.openGraphData.imageUrl;

  const SEOTags = (
    <React.Fragment>
      <title key="title">{_title}</title>
      <meta key="description" name="description" content={_description} />
    </React.Fragment>
  );

  const OpenGraphTags = (
    <React.Fragment>
      <meta key="og:image" property="og:image" content={_imageUrl} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:url" property="og:url" content={metaDefaults.canonicalUrl(router)} />
      <meta key="og:type" property="og:type" content="website" />

      <meta key="twitter:image" name="twitter:image" content={_imageUrl} />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="twitter:description" name="twitter:description" content={description} />
      <meta key="twitter:url" property="twitter:url" content={metaDefaults.canonicalUrl(router)} />
      <meta
        key="twitter:domain"
        property="twitter:domain"
        content={process.env.NEXT_PUBLIC_HOSTNAME}
      />
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
    </React.Fragment>
  );

  return { SEOTags, OpenGraphTags };
};
