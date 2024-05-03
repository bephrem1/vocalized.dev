import { FunctionComponent, useState } from 'react';

import { EmptyObject } from '../../../../../../types/empty';
import clsx from 'clsx';

const VapiCredentialCard: FunctionComponent<EmptyObject> = () => {
  const [hovered, setHovered] = useState<boolean>(false);

  const imageClass = clsx([
    'w-12 h-12',
    hovered ? 'rounded-lg' : 'rounded-3xl',
    'transition-all duration-300 ease-in-out'
  ]);

  return (
    <div
      className="flex flex-row p-4 border border-stone-600 border-dashed hover:bg-neutral-900 rounded-lg transition ease-in-out duration-300 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src="/images/logos/vapi.png" className={imageClass} draggable={false} />
    </div>
  );
};

export default VapiCredentialCard;
