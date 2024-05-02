import { Tabs, TabsList, TabsTrigger } from '../../../shared/shadcn/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '../../../shared/shadcn/components/ui/tooltip';

import { EmptyObject } from '../../../../types/empty';
import { FunctionComponent } from 'react';
import { PlaygroundMode } from '../playground-modes';

const PlaygroundModeToggle: FunctionComponent<EmptyObject> = () => {
  return (
    <Tabs defaultValue={PlaygroundMode.Conversation}>
      <TabsList className="bg-neutral-800 px-2 py-5">
        <TabsTrigger value={PlaygroundMode.Conversation}>Conversation</TabsTrigger>
        <DisabledTabItem value={PlaygroundMode.Speech} label="Speech" />
        <DisabledTabItem value={PlaygroundMode.Transcription} label="Transcription" />
      </TabsList>
    </Tabs>
  );
};

const DisabledTabItem = ({ label, value }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <TabsTrigger value={value} className="opacity-50" disabled={true}>
          <p className="text-white opacity-50">{label}</p>
        </TabsTrigger>
      </TooltipTrigger>
      <TooltipContent className="bg-neutral-800 mt-1">
        <p className="text-white">coming soon</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default PlaygroundModeToggle;
