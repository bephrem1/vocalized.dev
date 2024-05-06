import { EmptyObject } from '../../../types/empty';
import { FunctionComponent } from 'react';
import HomepageWaveform from './components/Waveform';
import React from 'react';

const Home: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-row w-full h-full items-center justify-center">
        <HomepageWaveform />
      </div>
    </div>
  );
};

export default Home;
