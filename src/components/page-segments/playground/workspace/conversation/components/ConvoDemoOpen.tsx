import { FunctionComponent, useContext } from 'react';

import { PlaygroundContext } from '../../../../../../context/playground';
import { PlusIcon } from '@radix-ui/react-icons';
import { ProviderId } from '../../../../../../fixtures/providers';

interface ConvoDemoOpenProps {
  demoIndex: number;
  providerId: ProviderId;
}

export const ConvoDemoOpen: FunctionComponent<ConvoDemoOpenProps> = ({ demoIndex, providerId }) => {
  const { openConvoDemo } = useContext(PlaygroundContext);
  const onClick = () => openConvoDemo({ index: demoIndex, providerId });

  return (
    <div
      className="flex flex-row w-full h-full items-center justify-center hover:bg-emerald-900 hover:bg-opacity-15 transition duration-100 ease-in"
      onClick={onClick}
    >
      <div className="flex flex-row w-24 h-24 items-center justify-center border border-dashed border-stone-600 rounded-full">
        <PlusIcon className="w-8 h-8 text-stone-600" />
      </div>
    </div>
  );
};

export default ConvoDemoOpen;
