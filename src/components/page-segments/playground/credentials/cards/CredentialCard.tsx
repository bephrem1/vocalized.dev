import { FunctionComponent, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '../../../../shared/shadcn/components/ui/tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { faX } from '@fortawesome/free-solid-svg-icons';

interface CredentialCardProps {
  providerName: string;
  providerImageUrl: string;
  credentialsSet?: boolean;
  onClick?: () => void;
}

const CredentialCard: FunctionComponent<CredentialCardProps> = ({
  providerName,
  providerImageUrl,
  credentialsSet = false,
  onClick
}) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const rootClass = clsx([
    'relative',
    'flex flex-row items-center justify-center',
    'py-6 px-8',
    'border',
    credentialsSet ? 'border-stone-400' : 'border-stone-700',
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
      <TooltipTrigger onClick={onClick}>
        <div
          className={rootClass}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {credentialsSet && <X hide={hovered} />}
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

const X = ({ hide }) => {
  const className = clsx([
    'absolute',
    'flex flex-row items-center justify-center',
    'top-0 right-0 w-5 h-5',
    'border-l border-l-stone-400 border-b border-b-stone-400',
    'rounded-tr-md rounded-bl-sm',
    hide ? 'opacity-0' : 'opacity-100',
    'transition-all duration-300 ease-in-out'
  ]);

  return (
    <div className={className}>
      <FontAwesomeIcon
        icon={faX}
        className="text-stone-400"
        style={{ width: '8px', height: '8px' }}
      />
    </div>
  );
};

export default CredentialCard;
