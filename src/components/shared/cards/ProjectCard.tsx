import { forwardRef, useState } from 'react';

import { INTERNAL_LINKS } from '../../../helpers/urls';
import { IProjectData } from '../../../fixtures/projects';
import Link from '../elements/Link';
import clsx from 'clsx';
import { isEmpty } from '../../../helpers/empty';
import { toTitlecase } from '../../../helpers/strings';

interface ProjectCardProps {
  className?: string;
  project: IProjectData;
  active?: boolean;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ className: _className, project, active }, ref) => {
    const [hovered, setHovered] = useState<boolean>(false);

    const internalClassName = clsx({
      'relative flex flex-row': true,
      'px-6 py-4': true,
      'rounded-md': true,
      'bg-neutral-800 bg-opacity-60': active,
      'hover:bg-neutral-900': !active,
      'border border-solid': true,
      'border-neutral-600': active,
      'border-neutral-800': !active
    });

    return (
      <div ref={ref} className={_className}>
        <Link type="internal" dest={INTERNAL_LINKS.PROJECT_PAGE({ projectSlug: project.slug })}>
          <div
            className={internalClassName}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="mr-4">
              <img
                src={project.logo.localPath}
                alt={project.displayName}
                className={clsx([
                  'min-w-12 w-12 min-h-12 h-12',
                  'transition-all duration-300 ease-in-out'
                ])}
                style={{
                  borderRadius: hovered ? '50%' : '10%'
                }}
              />
            </div>
            <div className="flex-grow">
              <div className="flex flex-row items-center justify-between mb-1">
                <p
                  className="text-neutral-300 text-lg font-medium"
                  style={{ lineHeight: '1.3rem' }}
                >
                  {project.displayName}
                </p>
                {!isEmpty(project?.tags) && (
                  <div className="flex flex-row -translate-y-0.5">
                    {project?.tags.slice(0, 2).map((tag) => {
                      return <TagPill key={tag} tag={tag} />;
                    })}
                  </div>
                )}
              </div>
              <p
                className="text-neutral-400 text-sx font-small"
                style={{
                  fontSize: '.9rem',
                  lineHeight: '1.2rem',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {project.description.short}
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
);

const TagPill = ({ tag }) => {
  const tagLabel = toTitlecase(tag);

  return (
    <div className="w-fit h-fit px-4 py-1 ml-1.5 first:ml-0 bg-neutral-900 border border-solid border-neutral-800 rounded-full select-none">
      <p className="text-neutral-300 text-xs">{tagLabel}</p>
    </div>
  );
};

export default ProjectCard;
