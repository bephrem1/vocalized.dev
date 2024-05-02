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
import PulsingOrb from '../../../shared/animated/PulsingOrb';
import { faKey } from '@fortawesome/free-solid-svg-icons';

const PlaygroundTopBar: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="flex justify-between content-between w-screen h-16 border-b border-b-stone-600 border-dashed">
      <LinkHomeBlock />
      <ProviderKeysBlock />
    </div>
  );
};

const LinkHomeBlock = () => {
  const Anchor = (
    <Link type="internal" dest={INTERNAL_LINKS.HOME} openInNewWindow>
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

const ProviderKeysBlock = () => {
  const { togglePlaygroundDrawer } = useContext(PlaygroundContext);

  const Anchor = (
    <div className="h-full w-36 flex items-center justify-center border-l border-l-stone-600 border-dashed">
      <div
        className="w-full h-full flex items-center justify-center hover:bg-indigo-950 cursor-pointer"
        onClick={togglePlaygroundDrawer}
      >
        <FontAwesomeIcon icon={faKey} className="text-xl text-white" />
      </div>
    </div>
  );
  const Content = <p className="text-white">Add Credentials</p>;

  return (
    <Tooltip>
      <TooltipTrigger>{Anchor}</TooltipTrigger>
      <TooltipContent className="bg-indigo-900">{Content}</TooltipContent>
    </Tooltip>
  );
};

export default PlaygroundTopBar;
