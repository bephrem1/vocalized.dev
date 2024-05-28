import { EXTERNAL_LINKS, INTERNAL_LINKS } from '../../../helpers/urls';
import { FunctionComponent, useState } from 'react';
import { IProjectData, ProjectRepoStats } from '../../../fixtures/projects';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../shared/shadcn/components/ui/tooltip';
import { faArrowLeftLong, faGamepad } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from '../../shared/shadcn/components/ui/input';
import Link from '../../shared/elements/Link';
import ProjectCards from './gutters/ProjectCards';
import ProjectContent from './content/ProjectContent';
import { ProjectDetailDimensions } from '.';
import ResourceCards from './gutters/ResourceLinksCards';
import XLogo from '../../../icons/lib/companies/XLogo';
import clsx from 'clsx';
import { isEmpty } from '../../../helpers/empty';
import { pluralize } from '../../../helpers/strings';
import { useRouter } from 'next/router';
import { useVisibleProjects } from './helpers/useVisibleProjects';

interface ProjectDetailProps {
  project: IProjectData;
}

const ProjectDetail: FunctionComponent<ProjectDetailProps> = ({ project }) => {
  const [searchFilter, setSearchFilter] = useState('');

  const visibleProjects = useVisibleProjects({ searchFilter });

  return (
    <div className="w-screen h-svh flex flex-col">
      <TopBar
        activeProject={project}
        visibleProjects={visibleProjects}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <div className="w-full flex flex-grow justify-center">
        <div className="flex flex-grow" style={{ flex: 1 }}>
          <ProjectCards projects={visibleProjects} />
        </div>
        <div className="flex flex-row h-full w-[775px] border-l border-l-stone-600 border-r border-r-stone-600 border-dashed">
          <ProjectContent project={project} />
        </div>
        <div className="flex flex-grow" style={{ flex: 1 }}>
          <ResourceCards projects={visibleProjects} />
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

const TopBar = ({
  activeProject,
  visibleProjects,
  searchFilter,
  setSearchFilter
}: {
  activeProject: IProjectData;
  visibleProjects: Array<IProjectData>;
  searchFilter: string;
  setSearchFilter: (_: string) => void;
}) => {
  const className = clsx([
    'flex flex-row justify-center',
    'w-screen',
    'border-b border-b-stone-600 border-dashed'
  ]);

  const projectsLabel = pluralize({
    value: ProjectRepoStats.TotalProjects,
    wordBase: 'project',
    withEs: false,
    includeOriginalFigure: false
  });
  const repositoriesLabel = pluralize({
    value: ProjectRepoStats.TotalRepositories,
    wordBase: 'repo',
    withEs: false,
    includeOriginalFigure: false
  });
  const linksLabel = pluralize({
    value: ProjectRepoStats.TotalLinks,
    wordBase: 'link',
    withEs: false,
    includeOriginalFigure: false
  });
  const StatFigure = ({ value, label }: { value: number; label: string }) => {
    return (
      <span>
        <p className="text-neutral-300 text-xs inline">{value} </p>
        <p className="text-neutral-400 text-xs inline">{label}</p>
      </span>
    );
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // filter for alphanumerics, space, '.', & '-'
    let value = event.target.value.replace(/[^a-z0-9 .-]/gi, '');

    // limit to 60 characters
    value = value.slice(0, 60);

    setSearchFilter(value);
  };

  const router = useRouter();
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (visibleProjects.length === 1) {
        router.push(INTERNAL_LINKS.PROJECT_PAGE({ projectSlug: visibleProjects[0].slug }));

        setSearchFilter('');
      }
    }
  };

  return (
    <div
      className={className}
      style={{
        height: ProjectDetailDimensions.TopBar.heightPx,
        minHeight: ProjectDetailDimensions.TopBar.heightPx
      }}
    >
      <div className="flex flex-grow" style={{ flex: 1 }}>
        <div className="flex flex-grow w-full h-full items-center justify-center">
          <StatFigure value={ProjectRepoStats.TotalProjects} label={projectsLabel} />
          <div
            className="w-1 h-1 bg-neutral-400 rounded-full mx-2"
            style={{ transform: 'translateY(1px)' }}
          />
          <StatFigure value={ProjectRepoStats.TotalRepositories} label={repositoriesLabel} />
          <div
            className="w-1 h-1 bg-neutral-400 rounded-full mx-2"
            style={{ transform: 'translateY(1px)' }}
          />
          <StatFigure value={ProjectRepoStats.TotalLinks} label={linksLabel} />
        </div>
      </div>
      <div className="relative flex flex-row h-full w-[775px] border-l border-l-stone-600 border-r border-r-stone-600 border-dashed">
        <div className="mr-5">
          <ReturnToProjectSearch />
        </div>
        <ContributorInterest />

        <LastUpdatedAt project={activeProject} />
      </div>
      <div className="flex flex-grow" style={{ flex: 1 }}>
        <Input
          id="project-searchbox"
          type="text"
          className="w-full h-full text-neutral-300 placeholder:text-neutral-500 px-8 border-none shadow-none focus-visible:ring-0"
          placeholder="Search for a project..."
          value={searchFilter}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
};

const BottomBar = () => {
  const className = clsx([
    'flex flex-row justify-center',
    'w-screen',
    'border-t border-t-stone-600 border-dashed'
  ]);

  return (
    <div
      className={className}
      style={{
        height: ProjectDetailDimensions.BottomBar.heightPx,
        minHeight: ProjectDetailDimensions.BottomBar.heightPx
      }}
    >
      <div className="flex flex-grow">
        <TryPlayground />
      </div>
      <div className="flex flex-row h-full items-center justify-center w-[775px] border-l border-l-stone-600 border-r border-r-stone-600 border-dashed" />
      <div className="flex flex-grow">
        <FollowOnX />
      </div>
    </div>
  );
};

const ReturnToProjectSearch = () => {
  const TooltipAnchor = (
    <Link type="internal" dest={INTERNAL_LINKS.HOME} fillContainer openInNewWindow={false}>
      <div className="flex flex-row w-[60px] h-full items-center justify-center hover:bg-red-900 hover:bg-opacity-25 transition duration-100 ease-in border-r border-r-stone-800 border-dashed">
        <FontAwesomeIcon icon={faArrowLeftLong} className="text-neutral-500 w-4 h-4" />
      </div>
    </Link>
  );

  return (
    <Tooltip>
      <TooltipTrigger className="h-full">{TooltipAnchor}</TooltipTrigger>
      <TooltipContent className="bg-stone-900 my-0.5">
        <p className="text-white">Return Home</p>
      </TooltipContent>
    </Tooltip>
  );
};

const ContributorInterest = () => {
  return (
    <div className="flex flex-row items-center">
      <Link type="internal" dest={EXTERNAL_LINKS.BEN.TWITTER} fillContainer={false} openInNewWindow>
        <div className="w-fit h-fit px-4 py-1 bg-neutral-900 border border-solid border-neutral-800 rounded-full select-none">
          <p className="text-neutral-300 text-xs">interested in contributing? dm @notbenyam</p>
        </div>
      </Link>
    </div>
  );
};

const LastUpdatedAt = ({ project }: { project: IProjectData }) => {
  const hide = isEmpty(project?.lastUpdatedAt);
  if (hide) {
    return null;
  }

  return (
    <div className="absolute h-full top-0 right-0 flex flex-row items-center pr-6">
      <p className="text-neutral-300 text-xs">Last Updated</p>
      <div className="w-1 h-1 bg-neutral-400 rounded-full mx-2" />
      <p className="text-neutral-400 text-xs">{project?.lastUpdatedAt}</p>
    </div>
  );
};

const TryPlayground = () => {
  return (
    <Link type="internal" dest={INTERNAL_LINKS.PLAYGROUND} fillContainer openInNewWindow>
      <div className="flex flex-row w-full h-full items-center justify-center hover:bg-amber-900 hover:bg-opacity-25 transition duration-100 ease-in">
        <FontAwesomeIcon icon={faGamepad} className="text-white w-5 h-5 mr-2" />
        <p className="text-white text-xs mr-1 inline">Voice Playground</p>
      </div>
    </Link>
  );
};

const FollowOnX = () => {
  return (
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
  );
};

export default ProjectDetail;
