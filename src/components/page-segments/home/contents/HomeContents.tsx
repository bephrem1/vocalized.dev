import { faGamepad, faMap } from '@fortawesome/free-solid-svg-icons';

import { EmptyObject } from '../../../../types/empty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';
import { INTERNAL_LINKS } from '../../../../helpers/urls';
import Link from '../../../shared/elements/Link';
import React from 'react';
import clsx from 'clsx';

const HomeContents: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="flex flex-row w-full h-full items-center">
      <div
        className={clsx([
          'flex flex-col w-full',
          'h-[350px] sm:h-[550px]',
          'border-t border-t-stone-800 border-b border-b-stone-800 border-dashed'
        ])}
      >
        <div className="flex flex-roww-full h-1/2 border-b border-b-stone-800 border-dashed">
          <div className="w-1/2 h-full border-r border-r-stone-800 border-dashed">
            <LinkPane
              dest={INTERNAL_LINKS.PLAYGROUND}
              label="Playground"
              faIcon={faGamepad}
              hoverColor="bg-emerald-900"
              openInNewWindow={false}
            />
          </div>
          <div className="w-1/2 h-full">
            <LinkPane
              dest={INTERNAL_LINKS.PROJECT_SEARCH()}
              label="Project Search"
              faIcon={faMap}
              hoverColor="bg-indigo-900"
              openInNewWindow={false}
            />
          </div>
        </div>
        <div className="flex flex-row w-full h-1/2">
          <div className="w-1/2 h-full border-r border-r-stone-800 border-dashed">
            <Null label="(components)" />
          </div>
          <div className="w-1/2 h-full">
            <Null label="(writing)" />
          </div>
        </div>
      </div>
    </div>
  );
};

const LinkPane = ({
  dest,
  label,
  faIcon,
  hoverColor,
  openInNewWindow = false
}: {
  dest: string;
  label: string;
  faIcon: any;
  hoverColor: string;
  openInNewWindow: boolean;
}) => {
  const className = clsx([
    'flex flex-row items-center justify-center',
    'w-full h-full',
    `hover:${hoverColor} hover:bg-opacity-15`,
    'transition duration-100 ease-in',
    'cursor-pointer'
  ]);

  return (
    <div className={className}>
      <Link type="internal" dest={dest} fillContainer openInNewWindow={openInNewWindow}>
        <div className="flex flex-row w-full h-full items-center justify-center">
          <FontAwesomeIcon icon={faIcon} className="text-neutral-300 w-5 h-5 mr-2" />
          <p className="text-neutral-300 text-xs mr-1 inline">{label}</p>
        </div>
      </Link>
    </div>
  );
};
const Null = ({ label }: { label?: string }) => {
  return (
    <div className="flex flex-row w-full h-full items-center justify-center hover:bg-neutral-900 transition duration-100 ease-in">
      <p className="text-neutral-700 text-xs select-none">∅{label ? ` ${label}` : ''}</p>
    </div>
  );
};

export default HomeContents;
