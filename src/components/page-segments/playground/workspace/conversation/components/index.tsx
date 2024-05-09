import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '../../../../../shared/elements/Link';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export const ConvoDemoLinkToSiteBadge = ({ dest, label }: { dest: string; label: string }) => {
  return (
    <div className="absolute left-5 bottom-6 opacity-80">
      <Link type="external" dest={dest} fillContainer={false} openInNewWindow>
        <div className="w-full h-full flex flex-row items-center justify-center px-2 py-1 bg-neutral-900 border border-neutral-800 rounded-sm">
          <p className="text-neutral-500 text-xs mr-1.5">{label}</p>
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

export const ConvoDemoLogoSymbol = ({ src }) => {
  return (
    <div className="absolute bottom-6 right-6 hover:opacity-80 transition-all duration-300">
      <img src={src} className="w-10 h-10 rounded-sm" draggable={false} />
    </div>
  );
};
