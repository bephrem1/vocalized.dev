import { FunctionComponent, useContext } from 'react';

import { EmptyObject } from '../../../../types/empty';
import InfoTooltip from '../../../shared/tooltip/InfoTooltip';
import { PlaygroundContext } from '../../../../context/playground';
import { Textarea } from '../../../shared/shadcn/components/ui/textarea';

const PlaygroundWorkspace: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="flex flex-row h-full w-full">
      <SystemPromptBlock />
    </div>
  );
};

const SystemPromptBlock = () => {
  const { systemPrompt, setSystemPrompt } = useContext(PlaygroundContext);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSystemPrompt(e.target.value);
  };

  return (
    <div className="w-full md:w-[507px] h-full px-7 pt-6 md:border-r md:border-r-stone-600 md:border-dashed">
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

export default PlaygroundWorkspace;
