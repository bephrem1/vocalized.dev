import { Button } from '../../shared/shadcn/components/ui/button';
import { EmptyObject } from '../../../types/empty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';
import { INTERNAL_LINKS } from '../../../helpers/urls';
import Link from '../../shared/elements/Link';
import NotFoundWaveform from './components/NotFoundWaveform';
import React from 'react';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const NotFound: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="w-screen h-svh">
      <div className="relative w-full h-full z-50">
        <div className="flex flex-col w-full h-full items-center justify-center translate -translate-y-12">
          <NotFoundLabel />
          <GoHomeButton />
        </div>
      </div>
      <div className="absolute w-screen h-svh sm:h-screen z-10 top-0 left-0">
        <NotFoundWaveform fadeInDelayMs={500} />
      </div>
    </div>
  );
};

const NotFoundLabel = () => {
  return (
    <div className="text-center mb-7">
      <h1 className="text-white text-4xl font-bold">404</h1>
      <p className="text-white text-lg">Page not found</p>
    </div>
  );
};

const GoHomeButton: FunctionComponent<EmptyObject> = () => {
  return (
    <Link type="internal" dest={INTERNAL_LINKS.HOME} fillContainer={false}>
      <Button className="border-dashed border-neutral-800">
        <div className="flex flex-row items-center justify-center">
          <div className="mr-1.5">
            <FontAwesomeIcon icon={faHome} className="text-white w-3.5 h-3.5" />
          </div>
          <p className="text-white">Go Home</p>
        </div>
      </Button>
    </Link>
  );
};

export default NotFound;
