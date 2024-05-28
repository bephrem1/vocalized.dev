import { FunctionComponent, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IProjectData } from '../../../fixtures/projects';
import Link from '../elements/Link';
import clsx from 'clsx';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

interface SpecialLinkCardProps {
  project: IProjectData;
  url: string;
  active?: boolean;
  className?: string;
}

const SpecialLinkCard: FunctionComponent<SpecialLinkCardProps> = ({
  project,
  url,
  active,
  className: _className
}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const internalClassName = clsx({
    'relative flex flex-row': true,
    'items-center': true,
    'px-4 py-3': true,
    'rounded-md': true,
    'bg-neutral-800 bg-opacity-60': active,
    'hover:bg-neutral-900': !active,
    'border border-solid': true,
    'border-neutral-600': active,
    'border-neutral-800': !active
  });

  const hostname = new URL(url).hostname;

  return (
    <div className={_className}>
      <Link type="external" dest={url}>
        <div
          className={internalClassName}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="flex flex-row mr-4">
            <FontAwesomeIcon
              icon={faLink}
              className={clsx([
                'min-w-5 w-5 min-h-5 h-5',
                'mr-2',
                'text-neutral-300',
                'transition-all duration-300 ease-in-out'
              ])}
            />
            <img
              src={project.logo.localPath}
              alt={project.displayName}
              className={clsx([
                'min-w-5 w-5 min-h-5 h-5',
                'transition-all duration-300 ease-in-out'
              ])}
              style={{
                borderRadius: hovered ? '50%' : '10%'
              }}
            />
          </div>
          <div>
            <p className="text-neutral-300 text-sm font-medium">{hostname}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SpecialLinkCard;
