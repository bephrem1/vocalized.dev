import { EXTERNAL_LINKS } from '../../../../helpers/urls';
import { EmptyObject } from '../../../../types/empty';
import { FunctionComponent } from 'react';
import Link from '../../../shared/elements/Link';
import SineWave from '../components/SineWave';
import XLogo from '../../../../icons/lib/companies/XLogo';

const PlaygroundFooter: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="flex justify-between content-between w-screen h-10 border-t border-t-stone-600 border-dashed">
      <ConnectionStatusBlock />
      <WhiteSpace />
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

const WhiteSpace = () => {
  return (
    <div className="flex flex-row flex-grow items-center justify-center">
      <SineWave heightPx={15} />
    </div>
  );
};

const FollowOnX = () => {
  return (
    <div className="h-full w-52 flex items-center justify-center border-l border-l-stone-600 border-dashed">
      <Link type="external" dest={EXTERNAL_LINKS.BEN.TWITTER} fillContainer openInNewWindow>
        <div className="w-full h-full flex items-center justify-center hover:bg-neutral-900">
          <div className="flex flex-row items-center justify-center">
            <span className="mr-1.5 flex items-center">
              <p className="text-white text-xs mr-1 inline">follow</p>
              <p className="text-stone-300 text-xs inline">@notbenyam</p>
            </span>
            <XLogo className="w-3 h-3" stroke="fill-white" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaygroundFooter;
