import { FunctionComponent, useContext } from 'react';

import { EmptyObject } from '../../../../types/empty';
import InfoTooltip from '../../../shared/tooltip/InfoTooltip';
import { PlaygroundContext } from '../../../../context/playground';
import PlaygroundConversationDemos from './conversation/PlaygroundConversationDemos';
import { ProviderId } from '../../../../fixtures/providers';
import { Textarea } from '../../../shared/shadcn/components/ui/textarea';
import { UserSpeechRecognitionProvider } from '../../../../context/user-speech-recognition';
import clsx from 'clsx';

const PlaygroundWorkspace: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="flex flex-col sm:flex-row h-full w-full">
      <ConfigsBlock />
      <UserSpeechRecognitionProvider>
        <PlaygroundConversationDemos />
      </UserSpeechRecognitionProvider>
    </div>
  );
};

const ConfigsBlock = () => {
  return (
    <div className="w-full md:w-[507px] px-7 pt-7 md:border-r md:border-r-stone-600 md:border-dashed overflow-y-auto">
      <div className="mb-6">
        <p className="text-white text-2xl font-semibold mb-2">Conversation</p>
        <p className="text-neutral-400 text-md">
          Split test real-time conversation with different voice AI providers.
        </p>
      </div>
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
        className="text-white h-[375px] min-h-[250px] max-h-[400px] border-solid border-neutral-400 focus:border-neutral-200"
      />
    </div>
  );
};

const FirstMessageArea = () => {
  const { firstMessage, setFirstMessage, activeConvoProviderId } = useContext(PlaygroundContext);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFirstMessage(e.target.value);
  };

  const disabled = activeConvoProviderId === ProviderId.Hume;
  const className = clsx({
    'opacity-50': disabled
  });

  return (
    <div className={className}>
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
        disabled={disabled}
      />
    </div>
  );
};

export default PlaygroundWorkspace;
