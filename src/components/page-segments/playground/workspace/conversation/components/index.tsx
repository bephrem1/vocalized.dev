import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '../../../../../shared/elements/Link';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export const ConvoDemoLinkToSiteBadge = ({ dest }: { dest: string }) => {
  return (
    <div className="absolute left-1 bottom-2 opacity-70">
      <Link type="external" dest={dest} fillContainer={false} openInNewWindow>
        <div className="w-full h-full flex flex-row items-center justify-center px-2 py-1 bg-neutral-900 border border-neutral-800 rounded-sm">
          <p className="text-neutral-500 text-xs mr-1.5">Visit</p>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="text-neutral-500"
            style={{ width: '12px', height: '12px' }}
          />
        </div>
      </Link>
    </div>
  );
};
