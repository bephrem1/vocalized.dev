import { EXTERNAL_LINKS } from '../../../helpers/urls';
import { EmptyObject } from '../../../types/empty';
import { FunctionComponent } from 'react';
import HomeContents from './contents/HomeContents';
import { HomepageDimensions } from '.';
import Link from '../../shared/elements/Link';
import React from 'react';
import XLogo from '../../../icons/lib/companies/XLogo';
import clsx from 'clsx';

const Home: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="w-screen h-svh flex flex-col">
      <TopBar />
      <Contents />
      <BottomBar />
    </div>
  );
};

const TopBar = () => {
  const className = clsx([
    'flex flex-row justify-center',
    'w-screen',
    'border-b border-b-stone-600 border-dashed'
  ]);

  return (
    <div
      className={className}
      style={{
        height: HomepageDimensions.TopBar.heightPx,
        minHeight: HomepageDimensions.TopBar.heightPx
      }}
    >
      <div
        className={clsx([
          'flex items-center justify-center',
          'max-lg:w-[30px]',
          'lg:flex-1 lg:flex-grow'
        ])}
      >
        <p className={clsx(['text-neutral-700 select-none', 'max-lg:hidden'])}>∅</p>
      </div>
      <div
        className={clsx([
          'relative flex items-center h-full px-6',
          'border-l border-l-stone-600 border-r border-r-stone-600 border-dashed',
          'lg:flex-row lg:w-[775px]',
          'max-lg:flex-grow max-lg:flex-1'
        ])}
      >
        <div>
          <span>
            <p className="text-neutral-400 text-xs">vocalized.dev</p>
            <p className="text-neutral-500 text-xs">A home for voice AI developers.</p>
          </span>
        </div>
      </div>
      <div
        className={clsx([
          'flex items-center justify-center',
          'max-lg:w-[30px]',
          'lg:flex-1 lg:flex-grow'
        ])}
      >
        <p className={clsx(['text-neutral-700 select-none', 'max-lg:hidden'])}>∅</p>
      </div>
    </div>
  );
};

const Contents = () => {
  return (
    <div className="w-full flex flex-grow justify-center">
      <div
        className={clsx([
          'flex items-center justify-center',
          'max-lg:w-[30px]',
          'lg:flex-1 lg:flex-grow'
        ])}
      >
        <p className={clsx(['text-neutral-700 select-none', 'max-lg:hidden'])}>∅</p>
      </div>
      <div
        className={clsx([
          'flex items-center h-full',
          'border-l border-l-stone-600 border-r border-r-stone-600 border-dashed',
          'lg:flex-row lg:w-[775px]',
          'max-lg:flex-grow max-lg:flex-1'
        ])}
      >
        <HomeContents />
      </div>
      <div
        className={clsx([
          'flex items-center justify-center',
          'max-lg:w-[30px]',
          'lg:flex-1 lg:flex-grow'
        ])}
      >
        <p className={clsx(['text-neutral-700 select-none', 'max-lg:hidden'])}>∅</p>
      </div>
    </div>
  );
};

const BottomBar = () => {
  const className = clsx([
    'flex flex-row justify-center',
    'w-screen',
    'border-t border-t-stone-600 border-dashed'
  ]);

  const year = new Date().getFullYear();

  return (
    <div
      className={className}
      style={{
        height: HomepageDimensions.BottomBar.heightPx,
        minHeight: HomepageDimensions.BottomBar.heightPx
      }}
    >
      <div
        className={clsx([
          'flex items-center justify-center',
          'max-lg:w-[30px]',
          'lg:flex-1 lg:flex-grow'
        ])}
      >
        <p className={clsx(['text-neutral-700 select-none', 'max-lg:hidden'])}>∅</p>
      </div>
      <div
        className={clsx([
          'flex flex-row items-center justify-between h-full px-6',
          'border-l border-l-stone-600 border-r border-r-stone-600 border-dashed',
          'lg:w-[775px]',
          'max-lg:flex-grow max-lg:flex-1'
        ])}
      >
        <div>
          <span>
            <p className="text-neutral-400 text-xs">made with ♥︎ in sf</p>
          </span>
        </div>
        <div>
          <span>
            <p className="text-neutral-400 text-xs">© {year} vocalized.dev</p>
          </span>
        </div>
      </div>
      <div
        className={clsx([
          'flex items-center justify-center',
          'max-lg:w-[30px]',
          'lg:flex-1 lg:flex-grow'
        ])}
      >
        <div className={clsx(['w-full h-full', 'max-lg:hidden'])}>
          <FollowOnX />
        </div>
      </div>
    </div>
  );
};

const FollowOnX = () => {
  return (
    <Link type="external" dest={EXTERNAL_LINKS.BEN.TWITTER} fillContainer openInNewWindow>
      <div className="w-full h-full flex items-center justify-center hover:bg-neutral-900">
        <div className="flex flex-row items-center justify-center">
          <span className="mr-1.5 flex items-center">
            <p className="text-white text-xs mr-1 inline">follow</p>
            <p className="text-stone-300 text-xs inline">@notbenyam</p>
          </span>
          <XLogo className="w-3 h-3" stroke="fill-white" />
        </div>
      </div>
    </Link>
  );
};

export default Home;
