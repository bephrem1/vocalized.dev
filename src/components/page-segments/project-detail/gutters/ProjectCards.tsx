import React, { FunctionComponent, useEffect, useRef } from 'react';

import { IProjectData } from '../../../../fixtures/projects';
import ProjectCard from '../../../shared/cards/ProjectCard';
import { ProjectDetailDimensions } from '..';
import { clsx } from 'clsx';
import { useProjectSlug } from '../../../../hooks/query-params';

interface ProjectCardsProps {
  projects: Array<IProjectData>;
}

export const ProjectCards: FunctionComponent<ProjectCardsProps> = ({ projects }) => {
  const barHeights =
    ProjectDetailDimensions.TopBar.heightPx + ProjectDetailDimensions.BottomBar.heightPx;
  const areaHeight = `calc(100vh - ${barHeights}px)`;

  const { projectSlug: activePageProjectSlug } = useProjectSlug();

  const { cardRefs } = useScrollToActiveProjectCard({
    activeProjectSlug: activePageProjectSlug,
    visibleProjects: projects
  });

  const className = clsx([
    'flex flex-col items-center',
    'w-full h-full',
    'pt-6',
    'overflow-y-auto'
  ]);

  return (
    <div className={className} style={{ height: areaHeight, minHeight: areaHeight }}>
      {projects.map((project, index) => {
        const active = activePageProjectSlug === project.slug;

        return (
          <ProjectCard
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            key={project.id}
            className="w-[410px] mb-5 last:mb-16"
            project={project}
            active={active}
          />
        );
      })}
      {projects.length === 0 && <NoMatchingProjects />}
    </div>
  );
};

const useScrollToActiveProjectCard = ({
  activeProjectSlug,
  visibleProjects
}: {
  visibleProjects: Array<IProjectData>;
  activeProjectSlug: string;
}) => {
  const refs = useRef(new Array<HTMLDivElement>(visibleProjects.length).fill(null));
  useEffect(() => {
    refs.current = refs.current.slice(0, visibleProjects.length);
  }, [visibleProjects.length]);

  const scrollTimeoutId = useRef<NodeJS.Timeout>();
  useEffect(() => {
    visibleProjects.forEach((project, index) => {
      if (activeProjectSlug === project.slug && refs.current[index]) {
        if (scrollTimeoutId.current) {
          clearTimeout(scrollTimeoutId.current);
        }

        scrollTimeoutId.current = setTimeout(() => {
          refs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
      }
    });

    return () => {
      if (scrollTimeoutId.current) {
        clearTimeout(scrollTimeoutId.current);
      }
    };
  }, [activeProjectSlug, visibleProjects, refs.current]);

  return { cardRefs: refs };
};

const NoMatchingProjects = () => {
  return (
    <div className="flex flex-row w-full h-full items-center justify-center">
      <span>
        <p className="text-neutral-400 text-sm select-none">No matching projects.</p>
        <p className="text-neutral-600 text-sm select-none">(try expanding your search)</p>
      </span>
    </div>
  );
};

export default ProjectCards;
