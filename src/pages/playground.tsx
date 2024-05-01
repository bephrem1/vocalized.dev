import { EmptyObject } from '../types/empty';
import { FunctionComponent } from 'react';
import Head from 'next/head';
import PageBase from '../components/shared/page/PageBase';
import Playground from '../components/page-segments/playground/Playground';

const PlaygroundPage: FunctionComponent<EmptyObject> = () => {
  return (
    <PageBase>
      <Head>
        <title>Vocalized | Playground</title>
      </Head>
      <Playground />
    </PageBase>
  );
};

export default PlaygroundPage;
