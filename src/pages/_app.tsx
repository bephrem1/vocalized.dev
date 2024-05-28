import '../styles/global.css';

import type { AppProps } from 'next/app';
import { ApplicationProvider } from '../context/application';
import Head from 'next/head';
import { ModalProvider } from '../context/modal';
import React from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';
import { Toaster } from '../components/shared/shadcn/components/ui/toaster';
import { TooltipProvider } from '../components/shared/shadcn/components/ui/tooltip';
import store from '../persistence/redux/store';
import { useDocumentHeadComponents } from '../hooks/page-headers';
import { useHydrateReduxFromStorage } from '../hooks/redux';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <ApplicationProvider>
        <ReactReduxProvider store={store}>
          <ModalProvider>
            <TooltipProvider>
              <GlobalHead />
              <GlobalEffects />
              <Component {...pageProps} />
            </TooltipProvider>
          </ModalProvider>

          <Toaster />
        </ReactReduxProvider>
      </ApplicationProvider>
    </div>
  );
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
