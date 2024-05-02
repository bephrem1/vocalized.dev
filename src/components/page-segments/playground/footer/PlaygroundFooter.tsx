import { EXTERNAL_LINKS } from '../../../../helpers/urls';
import { EmptyObject } from '../../../../types/empty';
import { FunctionComponent } from 'react';
import Link from '../../../shared/elements/Link';
import XLogo from '../../../../icons/lib/companies/XLogo';

const PlaygroundFooter: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="flex justify-between content-between w-screen h-8 border-t border-t-stone-600 border-dashed">
      <ConnectionStatusBlock />
      <FollowOnX />
    </div>
  );
};

const ConnectionStatusBlock = () => {
  return (
    <div className="h-full w-32 flex items-center justify-center border-r border-r-stone-600 border-dashed">
      <div className="w-full h-full flex items-center justify-center hover:bg-emerald-950">
        <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2" />
        <p className="text-white text-xs">connected</p>
      </div>
    </div>
  );
};

const FollowOnX = () => {
  return (
    <div className="h-full w-56 flex items-center justify-center border-l border-l-stone-600 border-dashed">
      <Link type="external" dest={EXTERNAL_LINKS.BEN.TWITTER} openInNewWindow>
        <div className="w-full h-full flex items-center justify-center hover:bg-neutral-900">
          <div className="flex flex-row items-center justify-center">
            <span className="mr-1.5">
              <p className="text-white text-xs inline">follow </p>
              <p className="text-white text-xs inline">@notbenyam</p>
            </span>
            <XLogo className="w-3 h-3" stroke="fill-white" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaygroundFooter;
