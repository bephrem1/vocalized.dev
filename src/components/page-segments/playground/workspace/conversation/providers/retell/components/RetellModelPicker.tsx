import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '../../../../../../../shared/shadcn/components/ui/select';

import { FunctionComponent } from 'react';
import { RetellModelId } from '..';

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
  const Text = ({ children }) => <p className="text-neutral-200 opacity-[96]">{children}</p>;

  switch (modelId) {
    case RetellModelId.OpenAIGPT3_5Turbo:
      return <Text>GPT-3.5 Turbo (Retell LLM)</Text>;
    case RetellModelId.OpenAIGPT4Turbo:
      return <Text>GPT-4 Turbo (Retell LLM)</Text>;
  }

  return null;
};

export default RetellModelPicker;
