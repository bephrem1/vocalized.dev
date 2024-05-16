import { FunctionComponent, useContext } from 'react';

import { PlaygroundContext } from '../../../../../../context/playground';
import { PlusIcon } from '@radix-ui/react-icons';
import { ProviderId } from '../../../../../../fixtures/providers';
import clsx from 'clsx';

interface ConvoDemoOpenProps {
  demoIndex: number;
  providerId: ProviderId;
}

export const ConvoDemoOpen: FunctionComponent<ConvoDemoOpenProps> = ({ demoIndex, providerId }) => {
  const { openConvoDemo } = useContext(PlaygroundContext);
  const onClick = () => openConvoDemo({ index: demoIndex, providerId });

  const className = clsx({
    'flex flex-row items-center justify-center': true,
    'w-full h-full': true,
    'hover:bg-emerald-900 hover:bg-opacity-15': true,
    'transition duration-100 ease-in': true,
    'cursor-pointer': true
  });

  return (
    <div className={className} onClick={onClick}>
      <div className="flex flex-row w-24 h-24 items-center justify-center border border-dashed border-stone-600 rounded-full">
        <PlusIcon className="w-7 h-7 text-stone-600" />
      </div>
    </div>
  );
};

export default ConvoDemoOpen;
