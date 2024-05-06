import { Button } from '../../shared/shadcn/components/ui/button';
import { EmptyObject } from '../../../types/empty';
import { FunctionComponent } from 'react';
import HomepageWaveform from './components/HomepageWaveform';
import { INTERNAL_LINKS } from '../../../helpers/urls';
import Link from '../../shared/elements/Link';
import React from 'react';

const Home: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full z-50">
        <div className="flex flex-row w-full h-full items-center justify-center">
          <Link type="internal" dest={INTERNAL_LINKS.PLAYGROUND} fillContainer={false}>
            <Button className="border-dashed border-neutral-800">{'<Playground />'}</Button>
          </Link>
        </div>
      </div>
      <div className="absolute w-screen h-screen z-[-1] top-0 left-0">
        <HomepageWaveform fadeInDelayMs={1000} />
      </div>
    </div>
  );
};

export default Home;
