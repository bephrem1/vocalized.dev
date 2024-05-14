import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '../../../../../../../shared/shadcn/components/ui/select';

import { BlandModelId } from '..';
import { FunctionComponent } from 'react';
import { twMerge } from 'tailwind-merge';

interface BlandModelPickerProps {
  modelId: BlandModelId;
  setModelId: (modelId: BlandModelId) => void;
}

export const BlandModelPicker: FunctionComponent<BlandModelPickerProps> = ({
  modelId,
  setModelId
}) => {
  const onValueChange = (modelId: BlandModelId) => {
    setModelId(modelId);
  };

  return (
    <Select value={modelId} onValueChange={onValueChange}>
      <SelectTrigger
        value={modelId}
        className=" flex flex-row w-fit h-[38px] bg-neutral-900 border-solid border-neutral-800"
      >
        <ModelSelectItem modelId={modelId} />
      </SelectTrigger>
      <SelectContent className="bg-neutral-900 border-solid border-neutral-800">
        {Object.values(BlandModelId).map((modelId) => (
          <SelectItem key={modelId} value={modelId} className="hover:bg-neutral-800">
            <ModelSelectItem modelId={modelId} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const ModelSelectItem = ({ modelId }) => {
  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-row mr-2.5">
        <ModelLogo modelId={modelId} />
      </div>
      <div className="mr-2">
        <ModelLabel modelId={modelId} />
      </div>
    </div>
  );
};

const ModelLogo = ({ modelId }) => {
  const logoClassName = 'w-[18px] h-[18px] rounded-[0.165rem]';

  switch (modelId) {
    case BlandModelId.Base:
    case BlandModelId.Enhanced:
    case BlandModelId.Turbo:
      return <img src="/images/logos/bland.png" className={logoClassName} draggable={false} />;
  }

  return null;
};

const ModelLabel = ({ modelId }) => {
  const TextRegular = ({ children }) => (
    <p className="text-neutral-200 text-sm opacity-[96] inline">{children}</p>
  );
  const TextSmall = ({ className = null, children }) => (
    <p className={twMerge('text-neutral-200 text-xs opacity-[96] inline', className)}>{children}</p>
  );

  switch (modelId) {
    case BlandModelId.Base:
      return (
        <span>
          <TextRegular>Base</TextRegular>
          <TextSmall className="text-neutral-400"> (Bland)</TextSmall>
        </span>
      );
    case BlandModelId.Enhanced:
      return (
        <span>
          <TextRegular>Enhanced</TextRegular>
          <TextSmall className="text-neutral-400"> (Bland)</TextSmall>
        </span>
      );
    case BlandModelId.Turbo:
      return (
        <span>
          <TextRegular>Turbo</TextRegular>
          <TextSmall className="text-neutral-400"> (Bland)</TextSmall>
        </span>
      );
  }

  return null;
};

export default BlandModelPicker;
