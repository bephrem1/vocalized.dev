import { EmptyObject } from '../types/empty';
import { FunctionComponent } from 'react';
import Head from 'next/head';
import NotFound from '../components/page-segments/not-found/NotFound';
import PageBase from '../components/shared/page/PageBase';

const NotFoundPage: FunctionComponent<EmptyObject> = () => {
  return (
    <PageBase>
      <Head>
        <title>Vocalized | Not Found</title>
      </Head>
      <NotFound />
    </PageBase>
  );
};

export default NotFoundPage;
