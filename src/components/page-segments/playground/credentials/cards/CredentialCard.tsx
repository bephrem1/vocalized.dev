import { FunctionComponent, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '../../../../shared/shadcn/components/ui/tooltip';

import clsx from 'clsx';

interface CredentialCardProps {
  providerName: string;
  providerImageUrl: string;
  credentialsSet?: boolean;
}

const CredentialCard: FunctionComponent<CredentialCardProps> = ({
  providerName,
  providerImageUrl,
  credentialsSet = false
}) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const rootClass = clsx([
    'flex flex-row py-6 px-8',
    'border',
    credentialsSet ? 'border-stone-800' : 'border-stone-700',
    credentialsSet ? 'border-solid' : 'border-dashed',
    credentialsSet ? 'hover:bg-red-950' : 'hover:bg-neutral-900',
    'rounded-lg transition ease-in-out duration-300 cursor-pointer'
  ]);
  const imageClass = clsx([
    'w-12 h-12 mb-3.5',
    hovered ? 'rounded-3xl' : 'rounded-lg',
    'transition-all duration-300 ease-in-out'
  ]);
  const tooltipContentClass = clsx([
    'm-2',
    credentialsSet ? 'bg-red-950' : 'bg-neutral-800',
    'transition-all duration-300 ease-in-out'
  ]);

  const tooltipLabel = credentialsSet
    ? `Clear ${providerName} Credentials`
    : `Set ${providerName} Credentials`;

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className={rootClass}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="flex flex-col items-center">
            <img src={providerImageUrl} className={imageClass} draggable={false} />
            <p className="text-white text-md font-medium">{providerName}</p>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent className={tooltipContentClass}>
        <p className="text-white">{tooltipLabel}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CredentialCard;
