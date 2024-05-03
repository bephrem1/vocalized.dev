import { FunctionComponent, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '../../../../../shared/shadcn/components/ui/tooltip';

import { EmptyObject } from '../../../../../../types/empty';
import clsx from 'clsx';

const VapiCredentialCard: FunctionComponent<EmptyObject> = () => {
  const [hovered, setHovered] = useState<boolean>(false);

  const imageClass = clsx([
    'w-12 h-12 mb-2',
    hovered ? 'rounded-3xl' : 'rounded-lg',
    'transition-all duration-300 ease-in-out'
  ]);

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className="flex flex-row py-6 px-8 border border-stone-600 border-dashed hover:bg-neutral-900 rounded-lg transition ease-in-out duration-300 cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="flex flex-col items-center">
            <img src="/images/logos/vapi.png" className={imageClass} draggable={false} />
            <p className="text-white text-lg font-medium">Vapi</p>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-neutral-800 m-2">
        <p className="text-white">Set Vapi Credentials</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default VapiCredentialCard;
