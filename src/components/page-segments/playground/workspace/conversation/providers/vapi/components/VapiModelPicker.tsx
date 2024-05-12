import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '../../../../../../../shared/shadcn/components/ui/select';

import { FunctionComponent } from 'react';
import { VapiModelId } from '..';

interface VapiModelPickerProps {
  modelId: VapiModelId;
  setModelId: (modelId: VapiModelId) => void;
}

export const VapiModelPicker: FunctionComponent<VapiModelPickerProps> = ({
  modelId,
  setModelId
}) => {
  const onValueChange = (modelId: VapiModelId) => {
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
        {Object.values(VapiModelId).map((modelId) => (
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

  const OpenAI = <img src="/images/logos/openai.png" className={logoClassName} draggable={false} />;
  const MetaServedOnGroq = (
    <>
      <div className="mr-1.5">
        <img src="/images/logos/groq.png" className={logoClassName} draggable={false} />
      </div>
      <img src="/images/logos/meta.png" className={logoClassName} draggable={false} />
    </>
  );

  switch (modelId) {
    // proprietary
    case VapiModelId.OpenAIGPT3_5Turbo:
    case VapiModelId.OpenAIGPT4Turbo:
      return OpenAI;

    // open source
    case VapiModelId.Llama8b_8192Groq:
    case VapiModelId.Llama70b_8192Groq:
      return MetaServedOnGroq;
  }

  return null;
};

const ModelLabel = ({ modelId }) => {
  const Text = ({ children }) => <p className="text-neutral-200 opacity-[96]">{children}</p>;

  switch (modelId) {
    case VapiModelId.OpenAIGPT3_5Turbo:
      return <Text>GPT-3.5 Turbo</Text>;
    case VapiModelId.OpenAIGPT4Turbo:
      return <Text>GPT-4 Turbo</Text>;
    case VapiModelId.Llama8b_8192Groq:
      return <Text>Llama 8b</Text>;
    case VapiModelId.Llama70b_8192Groq:
      return <Text>Llama 70b</Text>;
  }

  return null;
};

export default VapiModelPicker;
