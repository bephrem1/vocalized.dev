import React, { FunctionComponent } from 'react';

import { IProjectData } from '../../../../fixtures/projects';
import { ProjectDetailDimensions } from '..';
import RepositoryCard from '../../../shared/cards/RepositoryCard';
import SpecialLinkCard from '../../../shared/cards/SpecialLinkCard';
import { useProjectSlug } from '../../../../hooks/query-params';

interface ResourceCardsProps {
  projects: Array<IProjectData>;
}

export const ResourceCards: FunctionComponent<ResourceCardsProps> = ({ projects }) => {
  const barHeights =
    ProjectDetailDimensions.TopBar.heightPx + ProjectDetailDimensions.BottomBar.heightPx;
  const areaHeight = `calc(100vh - ${barHeights}px)`;

  const { projectSlug } = useProjectSlug();

  return (
    <div
      className="flex flex-col w-full items-center pt-8 pb-16 overflow-y-auto"
      style={{ height: areaHeight, minHeight: areaHeight }}
    >
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 place-items-center w-fit px-2 mb-12">
        {projects.map((project: IProjectData) => {
          const active = projectSlug === project.slug;

          return (
            <React.Fragment key={project.id}>
              {(project?.specialUrls || []).map((url) => {
                return (
                  <SpecialLinkCard
                    key={url}
                    className="min-w-[220px] w-[220px] max-w-[220px]"
                    project={project}
                    url={url}
                    active={active}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 place-items-center w-fit px-2">
        {projects.map((project: IProjectData) => {
          const active = projectSlug === project.slug;

          return (
            <React.Fragment key={project.id}>
              {(project?.githubRepositories || []).map((repoId) => {
                return (
                  <RepositoryCard
                    key={repoId}
                    className="min-w-[220px] w-[220px] max-w-[220px]"
                    project={project}
                    repoId={repoId}
                    active={active}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
      {projects.length === 0 && <NoMatchingResources />}
    </div>
  );
};

const NoMatchingResources = () => {
  return (
    <div className="flex flex-row w-full h-full items-center justify-center">
      <span>
        <p className="text-neutral-400 text-sm select-none">No matching links.</p>
        <p className="text-neutral-600 text-sm select-none">∅</p>
      </span>
    </div>
  );
};

export default ResourceCards;
