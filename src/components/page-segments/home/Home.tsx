import { Button } from '../../shared/shadcn/components/ui/button';
import { EmptyObject } from '../../../types/empty';
import { FunctionComponent } from 'react';
import HomepageWaveform from './components/HomepageWaveform';
import { INTERNAL_LINKS } from '../../../helpers/urls';
import Link from '../../shared/elements/Link';
import React from 'react';

const Home: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="w-screen h-screen bg-[#0a0a0a]">
      <div className="z-10">
        <div className="w-fit h-fit">
          <Link type="internal" dest={INTERNAL_LINKS.PLAYGROUND}>
            <Button>{'<Playground />'}</Button>
          </Link>
        </div>
      </div>
      <div className="absolute w-screen h-screen z-0">
        <HomepageWaveform fadeInDelayMs={1000} />
      </div>
    </div>
  );
};

export default Home;
