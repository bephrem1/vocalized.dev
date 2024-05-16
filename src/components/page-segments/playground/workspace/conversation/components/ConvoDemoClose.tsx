import { FunctionComponent, useContext } from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
import { PlaygroundContext } from '../../../../../../context/playground';

interface ConvoDemoCloseProps {
  demoIndex: number;
}

export const ConvoDemoClose: FunctionComponent<ConvoDemoCloseProps> = ({ demoIndex }) => {
  const { closeConvoDemo } = useContext(PlaygroundContext);
  const onClick = () => closeConvoDemo({ index: demoIndex });

  return (
    <div className="absolute flex flex-row top-0 right-0" onClick={onClick}>
      <div className="h-10 w-10 flex items-center justify-center hover:bg-red-900 hover:bg-opacity-20 border-l border-l-stone-800 border-b border-b-stone-800 border-dashed rounded-bl-lg cursor-pointer">
        <Cross2Icon className="w-4 h-4 text-stone-700" />
      </div>
    </div>
  );
};

export default ConvoDemoClose;
