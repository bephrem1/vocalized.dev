import { FunctionComponent, useContext } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '../../../shared/shadcn/components/ui/tooltip';

import { EmptyObject } from '../../../../types/empty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { INTERNAL_LINKS } from '../../../../helpers/urls';
import Link from '../../../shared/elements/Link';
import { PlaygroundContext } from '../../../../context/playground';
import PlaygroundModeToggle from '../components/PlaygroundModeToggle';
import PulsingOrb from '../../../shared/animated/PulsingOrb';
import clsx from 'clsx';
import { faKey } from '@fortawesome/free-solid-svg-icons';

const PlaygroundTopBar: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="flex justify-between content-between w-screen h-16 border-b border-b-stone-600 border-dashed">
      <div className="flex w-fit">
        <LinkHomeBlock />
        <PlaygroundModeBlock />
      </div>
      <NegativeSpaceWordmarkBlock />
      <ProviderKeysBlock />
    </div>
  );
};

const LinkHomeBlock = () => {
  const Anchor = (
    <Link type="internal" dest={INTERNAL_LINKS.HOME} fillContainer openInNewWindow>
      <div className="h-full w-24 flex items-center justify-center border-r border-r-stone-600 border-dashed">
        <div className="w-full h-full flex items-center justify-center hover:bg-emerald-950">
          <PulsingOrb />
        </div>
      </div>
    </Link>
  );
  const Content = <p className="text-white">Go Home</p>;

  return (
    <Tooltip>
      <TooltipTrigger>{Anchor}</TooltipTrigger>
      <TooltipContent className="bg-emerald-900">{Content}</TooltipContent>
    </Tooltip>
  );
};

const PlaygroundModeBlock = () => {
  return (
    <div className="h-full flex items-center justify-center border-r border-r-stone-600 border-dashed hover:bg-neutral-900">
      <div className="w-full h-full px-5 flex items-center justify-center">
        <PlaygroundModeToggle />
      </div>
    </div>
  );
};

const NegativeSpaceWordmarkBlock = () => {
  const Text = ({ top, left }) => {
    const className = clsx([
      'absolute',
      'text-neutral-800',
      'font-extrabold text-3xl',
      'skew-x-3 skew-y-3',
      'rotate-12',
      'opacity-20',
      'select-none whitespace-nowrap'
    ]);

    return (
      <p className={className} style={{ top, left }}>
        v o c a l i z e d v o c a l i z e d
      </p>
    );
  };

  return (
    <div className="relative flex flex-grow overflow-hidden">
      <Text top={60} left={-10} />
      <Text top={10} left={-60} />
      <Text top={0} left={35} />
      <Text top={0} left={165} />
      <Text top={0} left={300} />
      <Text top={0} left={435} />
      <Text top={0} left={570} />
      <Text top={0} left={705} />
      <Text top={0} left={840} />
      <Text top={0} left={975} />
      <Text top={0} left={1110} />
      <Text top={0} left={1245} />
      <Text top={0} left={1380} />
      <Text top={0} left={1515} />
      <Text top={0} left={1650} />
      <Text top={0} left={1785} />
    </div>
  );
};

const ProviderKeysBlock = () => {
  const { toggleCredentialsDrawer } = useContext(PlaygroundContext);

  const onClick = () => {
    toggleCredentialsDrawer();
  };

  const Anchor = (
    <div className="h-full w-36 flex items-center justify-center border-l border-l-stone-600 border-dashed">
      <div
        className="w-full h-full flex items-center justify-center hover:bg-indigo-950 cursor-pointer"
        onClick={onClick}
      >
        <FontAwesomeIcon
          icon={faKey}
          className="text-white"
          style={{ width: '20px', height: '20px' }}
        />
      </div>
    </div>
  );
  const Content = <p className="text-white">Set Credentials</p>;

  return (
    <Tooltip>
      <TooltipTrigger>{Anchor}</TooltipTrigger>
      <TooltipContent className="bg-indigo-900">{Content}</TooltipContent>
    </Tooltip>
  );
};

export default PlaygroundTopBar;
