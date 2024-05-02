import { FunctionComponent, useContext } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../../../shared/shadcn/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '../../../shared/shadcn/components/ui/tooltip';
import { faComments, faMicrophoneLines, faWaveSquare } from '@fortawesome/free-solid-svg-icons';

import { EmptyObject } from '../../../../types/empty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PlaygroundContext } from '../../../../context/playground';
import { PlaygroundMode } from '../playground-modes';

const PlaygroundModeToggle: FunctionComponent<EmptyObject> = () => {
  const { playgroundMode } = useContext(PlaygroundContext);

  return (
    <Tabs value={playgroundMode}>
      <TabsList className="bg-neutral-800 px-2 py-5">
        <TabsTrigger value={PlaygroundMode.Conversation}>
          <div className="flex flex-row items-center justify-center">
            <FontAwesomeIcon
              icon={faComments}
              className="text-neutral-900 mr-1"
              style={{ width: '14px', height: '14px' }}
            />
          </div>
          Conversation
        </TabsTrigger>
        <DisabledTabItem value={PlaygroundMode.Speech} label="Speech" icon={faWaveSquare} />
        <DisabledTabItem
          value={PlaygroundMode.Transcription}
          label="Transcription"
          icon={faMicrophoneLines}
        />
      </TabsList>
    </Tabs>
  );
};

const DisabledTabItem = ({ label, icon, value }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <TabsTrigger value={value} className="opacity-50" disabled={true}>
          <div className="flex flex-row items-center justify-center">
            <FontAwesomeIcon
              icon={icon}
              className="text-neutral-900 mr-1"
              style={{ width: '14px', height: '14px' }}
            />
          </div>
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
