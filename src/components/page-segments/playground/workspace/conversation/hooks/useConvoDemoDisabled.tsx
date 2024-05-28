import { PlaygroundContext } from '../../../../../../context/playground';
import { isEmpty } from '../../../../../../helpers/empty';
import { useContext } from 'react';

export const useConvoDemoDisabled = ({ providerId }: { providerId: string }) => {
  const { activeConvoProviderId } = useContext(PlaygroundContext);

  return !isEmpty(activeConvoProviderId) && activeConvoProviderId !== providerId;
};
