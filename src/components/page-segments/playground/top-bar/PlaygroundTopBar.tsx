import { EmptyObject } from '../../../../types/empty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';
import { INTERNAL_LINKS } from '../../../../helpers/urls';
import Link from '../../../shared/elements/Link';
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
  return (
    <div className="h-full w-24 flex items-center justify-center border-r border-r-stone-600 border-dashed">
      <Link type="internal" dest={INTERNAL_LINKS.HOME} openInNewWindow>
        <div className="w-full h-full flex items-center justify-center hover:bg-emerald-950">
          <PulsingOrb />
        </div>
      </Link>
    </div>
  );
};

const ProviderKeysBlock = () => {
  return (
    <div className="h-full w-36 flex items-center justify-center border-l border-l-stone-600 border-dashed">
      <div className="w-full h-full flex items-center justify-center hover:bg-blue-950 cursor-pointer">
        <FontAwesomeIcon icon={faKey} style={{ color: 'white', width: '20px', height: '20px' }} />
      </div>
    </div>
  );
};

export default PlaygroundTopBar;
