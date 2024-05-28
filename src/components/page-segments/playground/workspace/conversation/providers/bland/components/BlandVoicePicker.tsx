import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '../../../../../../../shared/shadcn/components/ui/select';

import { BlandVoiceId } from '..';
import { FunctionComponent } from 'react';
import { twMerge } from 'tailwind-merge';

interface BlandVoicePickerProps {
  voiceId: BlandVoiceId;
  setVoiceId: (voiceId: BlandVoiceId) => void;
}

export const BlandVoicePicker: FunctionComponent<BlandVoicePickerProps> = ({
  voiceId,
  setVoiceId
}) => {
  const onValueChange = (voiceId: BlandVoiceId) => {
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
        {Object.values(BlandVoiceId).map((voiceId) => (
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
  const Bland = <img src="/images/logos/bland.png" className={imgClassName} draggable={false} />;

  // countries
  const USA = <img src="/images/country/usa.png" className={imgClassName} draggable={false} />;

  switch (voiceId) {
    case BlandVoiceId.Tina:
    case BlandVoiceId.Josh:
      return (
        <>
          <div className="mr-1.5">{Bland}</div>
          {USA}
        </>
      );
  }

  return null;
};

const VoiceLabel = ({ voiceId }) => {
  const Text = ({ children }) => <p className="text-neutral-200 opacity-[96]">{children}</p>;

  switch (voiceId) {
    case BlandVoiceId.Tina:
      return <Text>Tina</Text>;
    case BlandVoiceId.Josh:
      return <Text>Josh</Text>;
  }

  return null;
};

const VoiceGender = ({ voiceId }) => {
  switch (voiceId) {
    case BlandVoiceId.Tina:
      return <GenderSymbol gender="female" />;
    case BlandVoiceId.Josh:
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

export default BlandVoicePicker;
