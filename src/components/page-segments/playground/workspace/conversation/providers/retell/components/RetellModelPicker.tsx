import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '../../../../../../../shared/shadcn/components/ui/select';

import { FunctionComponent } from 'react';
import { RetellModelId } from '..';
import { twMerge } from 'tailwind-merge';

interface RetellModelPickerProps {
  modelId: RetellModelId;
  setModelId: (modelId: RetellModelId) => void;
}

export const RetellModelPicker: FunctionComponent<RetellModelPickerProps> = ({
  modelId,
  setModelId
}) => {
  const onValueChange = (modelId: RetellModelId) => {
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
        {Object.values(RetellModelId).map((modelId) => (
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
    case RetellModelId.OpenAIGPT3_5Turbo:
    case RetellModelId.OpenAIGPT4Turbo:
      return (
        <>
          <div className="mr-1.5">
            <img src="/images/logos/openai.png" className={logoClassName} draggable={false} />
          </div>
          <img src="/images/logos/retell.png" className={logoClassName} draggable={false} />
        </>
      );
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
    case RetellModelId.OpenAIGPT3_5Turbo:
      return (
        <span>
          <TextRegular>GPT-3.5 Turbo</TextRegular>
          <TextSmall className="text-neutral-400"> (Retell LLM)</TextSmall>
        </span>
      );
    case RetellModelId.OpenAIGPT4Turbo:
      return (
        <span>
          <TextRegular>GPT-4 Turbo</TextRegular>
          <TextSmall className="text-neutral-400"> (Retell LLM)</TextSmall>
        </span>
      );
  }

  return null;
};

export default RetellModelPicker;
