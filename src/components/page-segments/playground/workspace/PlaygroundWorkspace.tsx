import { FunctionComponent, useContext } from 'react';

import { EmptyObject } from '../../../../types/empty';
import InfoTooltip from '../../../shared/tooltip/InfoTooltip';
import { PlaygroundContext } from '../../../../context/playground';
import PlaygroundConversationDemos from './conversation/PlaygroundConversationDemos';
import { Textarea } from '../../../shared/shadcn/components/ui/textarea';

const PlaygroundWorkspace: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="flex flex-row h-full w-full">
      <SystemPromptBlock />
      <PlaygroundConversationDemos />
    </div>
  );
};

const SystemPromptBlock = () => {
  return (
    <div className="w-full md:w-[507px] h-full px-7 pt-7 md:border-r md:border-r-stone-600 md:border-dashed">
      <SystemPromptArea />
      <FirstMessageArea />
    </div>
  );
};

const SystemPromptArea = () => {
  const { systemPrompt, setSystemPrompt } = useContext(PlaygroundContext);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSystemPrompt(e.target.value);
  };

  return (
    <div className="mb-6">
      <div className="flex flex-row items-center mb-3.5">
        <p className="text-white text-md font-normal mr-2">System Prompt</p>
        <InfoTooltip
          text="The system prompt can be used to configure the context, role, personality, & instructions for your voice assistant."
          sizePx={10}
          infoIconColor="text-neutral-100"
        />
      </div>
      <Textarea
        value={systemPrompt}
        placeholder="Enter your system prompt here..."
        onChange={handleChange}
        className="text-white h-[450px] min-h-[250px] max-h-[600px] border-solid border-neutral-400 focus:border-neutral-200"
      />
    </div>
  );
};

const FirstMessageArea = () => {
  const { firstMessage, setFirstMessage } = useContext(PlaygroundContext);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFirstMessage(e.target.value);
  };

  return (
    <div className="mb-3">
      <div className="flex flex-row items-center mb-3.5">
        <div className="flex flex-row items-center mr-2">
          <p className="text-white text-md font-normal mr-2">First Message</p>
          <InfoTooltip
            text="This is the first thing your voice assistant will say. If empty, the assistant will wait for you to speak first."
            sizePx={10}
            infoIconColor="text-neutral-100"
          />
        </div>
        <p className="text-neutral-400 text-xs font-light">(optional)</p>
      </div>
      <Textarea
        value={firstMessage}
        placeholder="Enter your first message here..."
        onChange={handleChange}
        className="text-white h-[100px] min-h-[75px] max-h-[125px] border-solid border-neutral-400 focus:border-neutral-200"
      />
    </div>
  );
};

export default PlaygroundWorkspace;
