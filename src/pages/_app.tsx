import '../styles/global.css';

import type { AppProps } from 'next/app';
import { ApplicationProvider } from '../context/application';
import Head from 'next/head';
import { ModalProvider } from '../context/modal';
import React from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';
import { TooltipProvider } from '../components/shared/shadcn/components/ui/tooltip';
import { isEmpty } from '../helpers/empty';
import store from '../persistence/redux/store';
import { useDocumentHeadComponents } from '../hooks/page-headers';
import { useHydrateReduxFromStorage } from '../hooks/redux';

interface AppPropsWithServerProps extends AppProps {
  props: ServerSideComputedProps;
}

const App = ({ Component, pageProps, props }: AppPropsWithServerProps) => {
  return (
    <div>
      <ApplicationProvider userAgent={props.userAgent}>
        <ReactReduxProvider store={store}>
          <ModalProvider>
            <TooltipProvider>
              <GlobalHead />
              <GlobalEffects />
              <Component {...pageProps} />
            </TooltipProvider>
          </ModalProvider>
        </ReactReduxProvider>
      </ApplicationProvider>
    </div>
  );
};

interface ServerSideComputedProps {
  userAgent: string;
}

App.getInitialProps = async ({ ctx: context }) => {
  const rawUserAgent = context?.req?.headers['user-agent'];

  return {
    props: {
      userAgent: !isEmpty(rawUserAgent) ? rawUserAgent : undefined
    }
  };
};

const GlobalHead = () => {
  const { SEOTags, OpenGraphTags } = useDocumentHeadComponents({});

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Native HTML Meta Tags for SEO */}
      {SEOTags}

      {/* Open Graph Data */}
      {OpenGraphTags}
    </Head>
  );
};

const GlobalEffects = () => {
  useHydrateReduxFromStorage();

  return null;
};

export default App;
