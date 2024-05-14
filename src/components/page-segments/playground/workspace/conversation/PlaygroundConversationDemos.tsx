import { FunctionComponent, useState } from 'react';

import BlandDemo from './providers/bland/BlandDemo';
import { EmptyObject } from '../../../../../types/empty';
import HumeDemo from './providers/HumeDemo';
import { ProviderId } from '../../../../../fixtures/providers';
import RetellDemo from './providers/retell/RetellDemo';
import VapiDemo from './providers/vapi/VapiDemo';

const PlaygroundConversationDemos: FunctionComponent<EmptyObject> = () => {
  const [visibleProviderIds, setVisibleProviderIds] = useState<Array<ProviderId>>([
    ProviderId.Vapi,
    ProviderId.Hume,
    ProviderId.Bland,
    ProviderId.Retell
  ]);

  return (
    <div className="flex flex-grow h-full">
      <div className="w-full grid grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-2">
        <div className="flex flex-row items-center justify-center border-dashed lg:border-r lg:border-r-stone-600 border-b border-b-stone-600">
          <ConversationDemo providerId={visibleProviderIds[0]} />
        </div>
        <div className="border-dashed border-b border-b-stone-600">
          <ConversationDemo providerId={visibleProviderIds[1]} />
        </div>
        <div className="border-dashed lg:border-r lg:border-r-stone-600 border-b border-b-stone-600 lg:border-b-0">
          <ConversationDemo providerId={visibleProviderIds[2]} />
        </div>
        <div>
          <ConversationDemo providerId={visibleProviderIds[3]} />
        </div>
      </div>
    </div>
  );
};

const ConversationDemo = ({ providerId }: { providerId: ProviderId }) => {
  switch (providerId) {
    case ProviderId.Vapi:
      return <VapiDemo />;
    case ProviderId.Retell:
      return <RetellDemo />;
    case ProviderId.Bland:
      return <BlandDemo />;
    case ProviderId.Hume:
      return <HumeDemo />;
    default:
      return null;
  }
};

export default PlaygroundConversationDemos;
