import { FunctionComponent, useContext, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../../../../../shared/shadcn/components/ui/popover';
import { ProviderId, getProviderById } from '../../../../../../fixtures/providers';

import { PlaygroundContext } from '../../../../../../context/playground';
import { PlusIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

interface ConvoDemoOpenProps {
  demoIndex: number;
}

const ProviderIdChoices = [ProviderId.Vapi, ProviderId.Hume, ProviderId.Bland, ProviderId.Retell];

export const ConvoDemoOpen: FunctionComponent<ConvoDemoOpenProps> = ({ demoIndex }) => {
  const { visibleConvoDemoProviderIds, openConvoDemo } = useContext(PlaygroundContext);
  const selectableProviderIds = ProviderIdChoices.filter(
    (providerId) => !visibleConvoDemoProviderIds.includes(providerId)
  );

  const [popoverOpen, setPopoverOpen] = useState(false);
  const togglePopover = () => setPopoverOpen(!popoverOpen);

  const containerClassName = clsx({
    'flex flex-row items-center justify-center': true,
    'w-full h-full': true,
    'hover:bg-emerald-900 hover:bg-opacity-15': true,
    'transition duration-100 ease-in': true,
    'cursor-pointer': true
  });

  return (
    <div className={containerClassName} onClick={togglePopover}>
      <Popover open={popoverOpen}>
        <div className="flex flex-row w-24 h-24 items-center justify-center border border-dashed border-stone-600 rounded-full">
          <PopoverTrigger>
            <PlusIcon className="w-7 h-7 text-stone-600" />
          </PopoverTrigger>
        </div>
        <PopoverContent className="w-[160px] px-0 py-2 bg-neutral-900 border-neutral-800">
          {selectableProviderIds.map((providerId) => {
            const onClick = () => {
              openConvoDemo({ index: demoIndex, providerId });
              setPopoverOpen(false);
            };

            return (
              <ConvoDemoProviderItem key={providerId} providerId={providerId} onClick={onClick} />
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
};

const ConvoDemoProviderItem = ({
  providerId,
  onClick
}: {
  providerId: ProviderId;
  onClick: () => void;
}) => {
  const provider = getProviderById(providerId);

  const className = clsx({
    'flex flex-row w-full items-center': true,
    'pl-5 pr-2': true,
    'hover:bg-neutral-800': true,
    'cursor-pointer': true,
    'transition duration-100 ease-in': true
  });

  return (
    <div
      className={className}
      style={{ paddingTop: '7px', paddingBottom: '7px' }}
      onClick={onClick}
    >
      <img src={provider.logo.localPath} className="w-6 h-6 rounded-sm" draggable={false} />
      <p className="text-neutral-100 text-sm font-medium ml-3">{provider.displayName}</p>
    </div>
  );
};

export default ConvoDemoOpen;
