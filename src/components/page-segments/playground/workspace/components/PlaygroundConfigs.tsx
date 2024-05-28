import { FunctionComponent, useContext } from 'react';
import { TooltipContent, TooltipTrigger } from '../../../../shared/shadcn/components/ui/tooltip';

import { EmptyObject } from '../../../../../types/empty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InfoTooltip from '../../../../shared/tooltip/InfoTooltip';
import { PlaygroundContext } from '../../../../../context/playground';
import { Projects } from '../../../../../fixtures/projects';
import { SYSTEM_PROMPT_DEFAULT } from '../../../../../fixtures/prompts';
import { Textarea } from '../../../../shared/shadcn/components/ui/textarea';
import { Tooltip } from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

const PlaygroundConfigs: FunctionComponent<EmptyObject> = () => {
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
  const resetSystemPrompt = () => {
    setSystemPrompt(SYSTEM_PROMPT_DEFAULT);
  };

  const showResetButton = systemPrompt !== SYSTEM_PROMPT_DEFAULT;

  return (
    <div className="mb-6">
      <div className="flex flex-row items-center justify-between mb-3.5">
        <div className="flex flex-row items-center h-[28px]">
          <p className="text-white text-md font-normal mr-2">System Prompt</p>
          <InfoTooltip
            text="The system prompt can be used to configure the context, role, personality, & instructions for your voice assistant."
            sizePx={10}
            infoIconColor="text-neutral-100"
          />
        </div>
        {showResetButton && (
          <Tooltip>
            <TooltipTrigger
              className="w-fit h-fit p-2 hover:bg-neutral-800 rounded-full cursor-pointer transition duration-100 ease-in"
              onClick={resetSystemPrompt}
            >
              <FontAwesomeIcon icon={faRefresh} className="w-3 h-3 text-neutral-200" />
            </TooltipTrigger>
            <TooltipContent className="bg-zinc-800 mb-0.5">
              <p className="text-white">Reset to Starter Prompt</p>
            </TooltipContent>
          </Tooltip>
        )}
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

  const disabled = activeConvoProviderId === Projects.Hume.id;
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

export default PlaygroundConfigs;
