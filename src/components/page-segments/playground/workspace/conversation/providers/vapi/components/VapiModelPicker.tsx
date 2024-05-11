import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../../../../../shared/shadcn/components/ui/select';

import { FunctionComponent } from 'react';
import { VapiModelId } from '..';

interface VapiModelPickerProps {
  modelId: string;
  setModelId: (modelId: VapiModelId) => void;
}

export const VapiModelPicker: FunctionComponent<VapiModelPickerProps> = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px] bg-neutral-900 border-solid border-neutral-800">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default VapiModelPicker;
