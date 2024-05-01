import { FunctionComponent, useContext } from 'react';

import { ApplicationContext } from '../../../context/application';
import Head from 'next/head';
import React from 'react';

interface Props {
  children: React.ReactNode | Array<React.ReactNode>;
}

const rootDivId = '#root';

const PageBase: FunctionComponent<Props> = ({ children }) => {
  const { darkmodeEnabled } = useContext(ApplicationContext);

  const faviconPath = darkmodeEnabled ? '/favicon.ico' : '/favicon-light.ico';

  return (
    <div id={rootDivId}>
      <Head>
        <title>vocalized.dev</title>
        <link rel="icon" href={faviconPath} />
      </Head>
      {children}
    </div>
  );
};

export default PageBase;
