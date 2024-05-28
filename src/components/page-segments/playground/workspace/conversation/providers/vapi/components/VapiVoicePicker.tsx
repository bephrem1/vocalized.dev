import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '../../../../../../../shared/shadcn/components/ui/select';

import { FunctionComponent } from 'react';
import { VapiVoiceId } from '..';
import { twMerge } from 'tailwind-merge';

interface VapiVoicePickerProps {
  voiceId: VapiVoiceId;
  setVoiceId: (voiceId: VapiVoiceId) => void;
}

export const VapiVoicePicker: FunctionComponent<VapiVoicePickerProps> = ({
  voiceId,
  setVoiceId
}) => {
  const onValueChange = (voiceId: VapiVoiceId) => {
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
        {Object.values(VapiVoiceId).map((voiceId) => (
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
  const PlayHT = <img src="/images/logos/playht.png" className={imgClassName} draggable={false} />;

  // countries
  const USA = <img src="/images/country/usa.png" className={imgClassName} draggable={false} />;

  switch (voiceId) {
    // PlayHT
    case VapiVoiceId.PlayHTJennifer:
    case VapiVoiceId.PlayHTJack:
      return (
        <>
          <div className="mr-1.5">{PlayHT}</div>
          {USA}
        </>
      );
  }

  return null;
};

const VoiceLabel = ({ voiceId }) => {
  const Text = ({ children }) => <p className="text-neutral-200 opacity-[96]">{children}</p>;

  switch (voiceId) {
    case VapiVoiceId.PlayHTJennifer:
      return <Text>Jennifer</Text>;
    case VapiVoiceId.PlayHTJack:
      return <Text>Jack</Text>;
  }

  return null;
};

const VoiceGender = ({ voiceId }) => {
  switch (voiceId) {
    case VapiVoiceId.PlayHTJennifer:
      return <GenderSymbol gender="female" />;
    case VapiVoiceId.PlayHTJack:
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

export default VapiVoicePicker;
