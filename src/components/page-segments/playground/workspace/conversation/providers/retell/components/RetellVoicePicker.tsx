import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '../../../../../../../shared/shadcn/components/ui/select';

import { FunctionComponent } from 'react';
import { RetellVoiceId } from '..';
import { twMerge } from 'tailwind-merge';

interface RetellVoicePickerProps {
  voiceId: RetellVoiceId;
  setVoiceId: (voiceId: RetellVoiceId) => void;
}

export const RetellVoicePicker: FunctionComponent<RetellVoicePickerProps> = ({
  voiceId,
  setVoiceId
}) => {
  const onValueChange = (voiceId: RetellVoiceId) => {
    setVoiceId(voiceId);
  };

  return (
    <Select value={voiceId} onValueChange={onValueChange}>
      <SelectTrigger
        value={voiceId}
        className=" flex flex-row w-fit h-[38px] bg-neutral-900 border-solid border-neutral-800"
      >
        <VoiceSelectItem voiceId={voiceId} />
      </SelectTrigger>
      <SelectContent className="bg-neutral-900 border-solid border-neutral-800">
        {Object.values(RetellVoiceId).map((voiceId) => (
          <SelectItem key={voiceId} value={voiceId} className="hover:bg-neutral-800">
            <VoiceSelectItem voiceId={voiceId} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const VoiceSelectItem = ({ voiceId }) => {
  return (
    <div className="flex flex-row items-center mr-2">
      <div className="flex flex-row mr-2.5">
        <VoiceLogo voiceId={voiceId} />
      </div>
      <div className="mr-2">
        <VoiceLabel voiceId={voiceId} />
      </div>
      <VoiceGender voiceId={voiceId} />
    </div>
  );
};

const VoiceLogo = ({ voiceId }) => {
  const imgClassName = 'w-[18px] h-[18px] rounded-[0.165rem]';

  // providers
  const ElevenLabs = (
    <img src="/images/logos/elevenlabs.png" className={imgClassName} draggable={false} />
  );

  // countries
  const USA = <img src="/images/country/usa.png" className={imgClassName} draggable={false} />;

  switch (voiceId) {
    // ElevenLabs
    case RetellVoiceId.ElevenLabsMarissa:
    case RetellVoiceId.ElevenLabsBing:
      return (
        <>
          <div className="mr-1.5">{ElevenLabs}</div>
          {USA}
        </>
      );
  }

  return null;
};

const VoiceLabel = ({ voiceId }) => {
  const Text = ({ children }) => <p className="text-neutral-200 opacity-[96]">{children}</p>;

  switch (voiceId) {
    case RetellVoiceId.ElevenLabsMarissa:
      return <Text>Marissa</Text>;
    case RetellVoiceId.ElevenLabsBing:
      return <Text>Bing</Text>;
  }

  return null;
};

const VoiceGender = ({ voiceId }) => {
  switch (voiceId) {
    case RetellVoiceId.ElevenLabsMarissa:
      return <GenderSymbol gender="female" />;
    case RetellVoiceId.ElevenLabsBing:
      return <GenderSymbol gender="male" />;
  }
};

const GenderSymbol = ({ gender }: { gender: 'male' | 'female' }) => {
  const backgroundClassName = gender === 'female' ? 'bg-pink-400' : 'bg-blue-400';
  const symbol = gender === 'female' ? '♀' : '♂';

  const className = twMerge(
    backgroundClassName,
    'flex flex-row items-center justify-center w-[18px] h-[18px] rounded-[0.165rem]'
  );

  return (
    <div className={className}>
      <p className="text-white text-xs font-semibold">{symbol}</p>
    </div>
  );
};

export default RetellVoicePicker;
