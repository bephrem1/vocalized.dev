import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '../../../../../../../shared/shadcn/components/ui/select';

import { FunctionComponent } from 'react';
import { HumeModelId } from '..';
import { twMerge } from 'tailwind-merge';

interface HumeModelPickerProps {
  modelId: HumeModelId;
  setModelId: (modelId: HumeModelId) => void;
}

export const HumeModelPicker: FunctionComponent<HumeModelPickerProps> = ({
  modelId,
  setModelId
}) => {
  const onValueChange = (modelId: HumeModelId) => {
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
        {Object.values(HumeModelId).map((modelId) => (
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

  const Hume = <img src="/images/logos/hume.png" className={logoClassName} draggable={false} />;
  const OpenAI = <img src="/images/logos/openai.png" className={logoClassName} draggable={false} />;
  const Anthropic = (
    <img src="/images/logos/anthropic.png" className={logoClassName} draggable={false} />
  );

  const Groq = <img src="/images/logos/groq.png" className={logoClassName} draggable={false} />;
  const MetaServedOnGroq = (
    <>
      <div className="mr-1.5">{Groq}</div>
      <img src="/images/logos/meta.png" className={logoClassName} draggable={false} />
    </>
  );
  const GoogleServedOnGroq = (
    <>
      <div className="mr-1.5">{Groq}</div>
      <img src="/images/logos/google.png" className={logoClassName} draggable={false} />
    </>
  );

  switch (modelId) {
    case HumeModelId.Default:
      return Hume;

    case HumeModelId.Gpt3_5Turbo:
    case HumeModelId.Gpt4TurboPreview:
    case HumeModelId.Gpt4o:
      return OpenAI;

    case HumeModelId.Claude3Opus:
    case HumeModelId.Claude3Sonnet:
    case HumeModelId.Claude3Haiku:
      return Anthropic;

    case HumeModelId.Llama8b_8192Groq:
    case HumeModelId.Llama70b_8192Groq:
      return MetaServedOnGroq;
    case HumeModelId.Gemma7bItGroq:
      return GoogleServedOnGroq;
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
    case HumeModelId.Default:
      return (
        <span>
          <TextRegular>Default</TextRegular>
          <TextSmall className="text-neutral-400"> (Hume eLLM)</TextSmall>
        </span>
      );

    case HumeModelId.Gpt3_5Turbo:
      return <TextRegular>GPT-3.5 Turbo</TextRegular>;
    case HumeModelId.Gpt4TurboPreview:
      return <TextRegular>GPT-4 Turbo</TextRegular>;
    case HumeModelId.Gpt4o:
      return <TextRegular>GPT-4o</TextRegular>;

    case HumeModelId.Claude3Opus:
      return <TextRegular>Claude 3 Opus</TextRegular>;
    case HumeModelId.Claude3Sonnet:
      return <TextRegular>Claude 3 Sonnet</TextRegular>;
    case HumeModelId.Claude3Haiku:
      return <TextRegular>Claude 3 Haiku</TextRegular>;

    case HumeModelId.Llama8b_8192Groq:
      return <TextRegular>Llama 8b</TextRegular>;
    case HumeModelId.Llama70b_8192Groq:
      return <TextRegular>Llama 70b</TextRegular>;
    case HumeModelId.Gemma7bItGroq:
      return <TextRegular>Gemma 7b</TextRegular>;
  }

  return null;
};

export default HumeModelPicker;
