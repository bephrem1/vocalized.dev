import { EmptyObject } from '../types/empty';
import { FunctionComponent } from 'react';
import Head from 'next/head';
import PageBase from '../components/shared/page/PageBase';

const PlaygroundPage: FunctionComponent<EmptyObject> = () => {
  return (
    <PageBase>
      <Head>
        <title>Vocalized | Playground</title>
      </Head>
      playground
    </PageBase>
  );
};

export default PlaygroundPage;
