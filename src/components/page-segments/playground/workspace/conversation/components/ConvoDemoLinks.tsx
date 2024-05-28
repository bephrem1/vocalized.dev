import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';
import Link from '../../../../../shared/elements/Link';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { isEmpty } from '../../../../../../helpers/empty';

interface ConvoDemoLinksProps {
  docsLink?: string;
  playgroundLink?: string;
}

export const ConvoDemoLinks: FunctionComponent<ConvoDemoLinksProps> = ({
  docsLink,
  playgroundLink
}) => {
  const links = [];
  if (!isEmpty(docsLink)) {
    links.push({ dest: docsLink, label: 'docs' });
  }
  if (!isEmpty(playgroundLink)) {
    links.push({ dest: playgroundLink, label: 'playground' });
  }

  return (
    <div className="absolute flex flex-row left-5 bottom-6 opacity-80 last:ml-2">
      <div className="flex flex-row">
        {links.map(({ dest, label }, index) => (
          <LinkItem key={index} dest={dest} label={label} />
        ))}
      </div>
    </div>
  );
};

const LinkItem = ({ dest, label }) => {
  return (
    <div className="mr-2 last:mr-0">
      <Link type="external" dest={dest} fillContainer openInNewWindow>
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

export default ConvoDemoLinks;
