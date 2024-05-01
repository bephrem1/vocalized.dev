import { EmptyObject } from '../../../../types/empty';
import { FunctionComponent } from 'react';
import { INTERNAL_LINKS } from '../../../../helpers/urls';
import Link from '../../../shared/elements/Link';
import PulsingOrb from '../../../shared/animated/PulsingOrb';

const PlaygroundTopBar: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="w-screen h-16 border-b border-b-stone-600 border-dashed">
      <div className="h-full w-24 flex items-center justify-center border-r border-r-stone-600 border-dashed">
        <LinkHomeBlock />
      </div>
    </div>
  );
};

const LinkHomeBlock = () => {
  return (
    <Link type="internal" dest={INTERNAL_LINKS.HOME} openInNewWindow>
      <div className="w-full h-full flex items-center justify-center hover:bg-emerald-950">
        <PulsingOrb />
      </div>
    </Link>
  );
};

export default PlaygroundTopBar;
