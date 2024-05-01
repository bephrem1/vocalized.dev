import { FunctionComponent } from 'react';
import Head from 'next/head';
import React from 'react';

interface Props {
  children: React.ReactNode | Array<React.ReactNode>;
}

const rootDivId = '#root';

const PageBase: FunctionComponent<Props> = ({ children }) => {
  return (
    <div id={rootDivId}>
      <Head>
        <title>vocalized.dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
};

export default PageBase;
