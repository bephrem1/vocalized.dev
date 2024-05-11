import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../../../../../shared/shadcn/components/ui/select';

import { FunctionComponent } from 'react';
import { VapiModelId } from '..';

interface VapiModelPickerProps {
  modelId: string;
  setModelId: (modelId: VapiModelId) => void;
}

export const VapiModelPicker: FunctionComponent<VapiModelPickerProps> = ({
  modelId,
  setModelId
}) => {
  return (
    <div className="relative flex flex-row">
      <div>
        <p></p>
      </div>

      <Select>
        <SelectTrigger className=" flex flex-row  w-fit h-[38px] bg-neutral-900 border-solid border-neutral-800">
          <ModelSelectItem modelId={VapiModelId.Llama70b_8192Groq} />
        </SelectTrigger>
        <SelectContent className="bg-neutral-900 border-solid border-neutral-800">
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

const ModelSelectItem = ({ modelId }) => {
  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-row mr-2.5">
        <ModelLogo modelId={modelId} />
      </div>
      <div className="mr-2">
        <p className="text-neutral-200 opacity-[96]">Llama 70b 8192</p>
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
      return OpenAI;
    case VapiModelId.OpenAIGPT4Turbo:
      return OpenAI;

    // open source
    case VapiModelId.Llama8b_8192Groq:
      return MetaServedOnGroq;
    case VapiModelId.Llama70b_8192Groq:
      return MetaServedOnGroq;
  }

  return null;
};

export default VapiModelPicker;
