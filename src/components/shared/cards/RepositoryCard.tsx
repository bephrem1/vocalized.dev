import { FunctionComponent, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IProjectData } from '../../../fixtures/projects';
import Link from '../elements/Link';
import clsx from 'clsx';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

interface RepositoryCardProps {
  project: IProjectData;
  repoId: string; // {owner}/{repoName}
  active?: boolean;
  className?: string;
}

const RepositoryCard: FunctionComponent<RepositoryCardProps> = ({
  project,
  repoId,
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

  const repoName = repoId.split('/')[1];
  const repoUrl = REPO_LINK({ repoId });

  return (
    <div className={_className}>
      <Link type="external" dest={repoUrl}>
        <div
          className={internalClassName}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="flex flex-row mr-4">
            <FontAwesomeIcon
              icon={faGithub}
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
            <p className="text-neutral-300 text-sm font-medium">
              {repoName.length > 15 ? `${repoName.substring(0, 15)}...` : repoName}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

const REPO_LINK = ({ repoId }: { repoId: string }) => {
  return `https://github.com/${repoId}`;
};

export default RepositoryCard;
