import { FunctionComponent, useContext, useEffect, useState } from 'react';

import { ApplicationContext } from '../../../context/application';
import Head from 'next/head';
import { LOCAL_STORAGE_KEYS } from '../../../persistence';
import React from 'react';
import VocalizedCursive from '../animated/VocalizedCursive';
import clsx from 'clsx';
import { useOpacity } from '../../../hooks/animation';
import { usePersistedValue } from '../../../hooks/persistence';

interface Props {
  children: React.ReactNode | Array<React.ReactNode>;
}

const rootDivId = '#root';

const CursiveAnimation = {
  drawInDurationMs: 1500,
  fadeInDurationMs: 500,
  eraseDelayMs: 500,
  eraseDurationMs: 2500,
  fadeOutDurationMs: 750
};

const PageBase: FunctionComponent<Props> = ({ children }) => {
  const { darkmodeEnabled } = useContext(ApplicationContext);
  const faviconPath = darkmodeEnabled ? '/favicon.ico' : '/favicon-light.ico';

  const {
    showCursiveAnimation,
    contentsHidden,
    contentsOpacity,
    onAnimationStart,
    onAnimationEnd
  } = useCursiveAnimation();
  const contentsClass = clsx({
    hidden: contentsHidden
  });

  return (
    <div id={rootDivId}>
      <Head>
        <title>vocalized.dev</title>
        <link rel="icon" href={faviconPath} />
      </Head>
      <>
        <div className={contentsClass} style={{ opacity: contentsOpacity }}>
          {children}
        </div>
        {showCursiveAnimation && (
          <div className="flex flex-row w-full h-svh items-center justify-center">
            <div className="w-full sm:w-[600px]">
              <VocalizedCursive
                drawInDurationMs={CursiveAnimation.drawInDurationMs}
                fadeInDurationMs={CursiveAnimation.fadeInDurationMs}
                eraseDelayMs={CursiveAnimation.eraseDelayMs}
                eraseDurationMs={CursiveAnimation.eraseDurationMs}
                fadeOutDurationMs={CursiveAnimation.fadeOutDurationMs}
                onAnimationStart={onAnimationStart}
                onAnimationEnd={onAnimationEnd}
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
};

const useCursiveAnimation = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationEnded, setAnimationEnded] = useState(false);
  const {
    value: cursiveAnimationShown,
    setValue: setCursiveAnimationShown,
    hydrated: cursiveAnimationShowValueLoaded
  } = usePersistedValue<boolean>({
    defaultValue: false,
    persistenceKey: LOCAL_STORAGE_KEYS.ANIMATION.PAGE_BASE.VOCALIZED_CURSIVE_SHOWN,
    useLocalStorage: true
  });

  const animatedOpacity = useOpacity({
    start: 0,
    end: 1,
    durationMs: animationEnded ? 500 : 0,
    begin: animationEnded
  });

  const onAnimationStart = () => {
    setAnimationStarted(true);
  };
  const onAnimationEnd = () => {
    setCursiveAnimationShown(true);
    setAnimationEnded(true);
  };

  return {
    showCursiveAnimation: cursiveAnimationShowValueLoaded && !cursiveAnimationShown,
    contentsHidden: !cursiveAnimationShowValueLoaded || !cursiveAnimationShown,
    contentsOpacity: !animationStarted ? 1 : animatedOpacity,
    onAnimationStart,
    onAnimationEnd
  };
};

export default PageBase;
