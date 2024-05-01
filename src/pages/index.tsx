import { EmptyObject } from '../types/empty';
import { FunctionComponent } from 'react';
import Head from 'next/head';
import PageBase from '../components/shared/page/PageBase';

const RootHomePage: FunctionComponent<EmptyObject> = () => {
  return (
    <PageBase>
      <Head>
        <title>Vocalized | A Home for Voice AI Developers</title>
      </Head>
      home
    </PageBase>
  );
};

export default RootHomePage;