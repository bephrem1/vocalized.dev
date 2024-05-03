import { CredentialsProvider } from '../context/credentials';
import { EmptyObject } from '../types/empty';
import { FunctionComponent } from 'react';
import Head from 'next/head';
import PageBase from '../components/shared/page/PageBase';
import Playground from '../components/page-segments/playground/Playground';
import { PlaygroundProvider } from '../context/playground';

const PlaygroundPage: FunctionComponent<EmptyObject> = () => {
  return (
    <PageBase>
      <Head>
        <title>Vocalized | Playground</title>
      </Head>
      <PlaygroundProvider>
        <CredentialsProvider>
          <Playground />
        </CredentialsProvider>
      </PlaygroundProvider>
    </PageBase>
  );
};

export default PlaygroundPage;
