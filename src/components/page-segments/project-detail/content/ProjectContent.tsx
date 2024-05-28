import { faArrowUpRightFromSquare, faBook, faSliders } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faGithub, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';
import { IProjectData } from '../../../../fixtures/projects';
import Link from '../../../shared/elements/Link';
import XLogo from '../../../../icons/lib/companies/XLogo';
import clsx from 'clsx';
import { isEmpty } from '../../../../helpers/empty';

interface ProjectContentProps {
  project: IProjectData;
}

const ProjectContent: FunctionComponent<ProjectContentProps> = ({ project }) => {
  return (
    <div className="flex flex-row h-full w-full">
      <LeftColumn project={project} />
      <RightColumn project={project} />
    </div>
  );
};

const RightColumn = ({ project }: { project: IProjectData }) => {
  return (
    <div className="flex flex-col flex-grow pt-8 px-8 overflow-y-auto">
      <div className="mb-4">
        <Title project={project} />
      </div>
      <div className="flex flex-col items-center">
        <Description project={project} />
        <div className="border-b border-neutral-800 w-full my-5" />
        <TimelineNotes project={project} />
      </div>
    </div>
  );
};

const Title = ({ project }: { project: IProjectData }) => {
  return (
    <div className="flex flex-row w-fit h-fit items-center">
      <p className="text-neutral-200 font-medium text-4xl">{project.displayName}</p>
      {project.tagline && (
        <>
          <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full mx-2.5" />
          <p className="text-neutral-400 font-sm text-md" style={{ lineHeight: '1.4rem' }}>
            “{project.tagline}”
          </p>
        </>
      )}
    </div>
  );
};

const Description = ({ project }: { project: IProjectData }) => {
  const descriptionLong = !isEmpty(project.description?.long)
    ? project.description?.long
        .trim()
        .split('\n')
        .map((line, index) => (
          <p key={index} className="text-neutral-300 text-sm mb-2">
            {line}
          </p>
        ))
    : null;

  return (
    <div className="flex flex-col w-full">
      {project?.description?.short && (
        <div className="mb-4 last:mb-0">
          <p className="text-neutral-500 text-sm mb-1">Overview</p>
          <p className="text-neutral-300 text-md">{project?.description?.short}</p>
        </div>
      )}
      {descriptionLong && (
        <div className="mb-4 last:mb-0">
          <p className="text-neutral-500 text-sm mb-1">Description</p>
          {descriptionLong}
        </div>
      )}
    </div>
  );
};

const TimelineNotes = ({ project }: { project: IProjectData }) => {
  return (
    <div className="flex flex-col w-full relative">
      {/* vertical line behind the dots with gradient fade at the bottom */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-neutral-300 to-transparent"
        style={{ left: '3.24px' }}
      />

      {Object.entries(project.timelineNotes || {}).map(([date, notes], index, array) => {
        const Text = !isEmpty(notes)
          ? notes
              .trim()
              .split('\n')
              .map((line, index) => (
                <p key={index} className="text-neutral-300 text-sm mb-1.5">
                  {line}
                </p>
              ))
          : null;

        return (
          <div key={date} className="flex items-start mb-4">
            <div className="w-2 mr-4 flex flex-col items-center">
              <div className="bg-neutral-300 h-3 w-3 rounded-full" />
              {index !== array.length - 1 && <div className="w-0.5 bg-white flex-grow" />}
            </div>
            <div className="flex flex-col">
              <p className="text-neutral-500 text-sm mb-1">{date}</p>
              {Text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const LeftColumn = ({ project }: { project: IProjectData }) => {
  const className = clsx({
    'flex flex-col justify-between': true,
    'min-w-[250px] w-[250px] max-w-[250px] h-full': true,
    'border-r border-r-neutral-800 border-dashed': true
  });

  return (
    <div className={className}>
      <div>
        <div className="flex flex-row w-full items-center justify-center py-12 border-b border-b-neutral-800 border-dashed">
          <LogoImage src={project.logo.localPath} />
        </div>
        <div className="w-full h-fit border-b border-b-neutral-800 border-dashed">
          <LinkToWebsite url={project.siteLinks.homepage} />
        </div>
        <FoundersSection project={project} />
        <FoundedOnSection project={project} />
      </div>
      <div>
        <ResourcesSection project={project} />
        <SocialsSection project={project} />
      </div>
    </div>
  );
};

const FoundedOnSection = ({ project }: { project: IProjectData }) => {
  const hasFoundedOn = project.foundedOn;
  if (!hasFoundedOn) {
    return null;
  }

  return (
    <div className="flex flex-row w-full pt-3 pb-3 border-b border-b-neutral-800 border-dashed">
      <div className="w-full pl-6 pr-3">
        <div className="flex flex-row items-center">
          <p className="text-neutral-300 text-xs">Founded</p>
          <div className="w-1 h-1 bg-neutral-400 rounded-full mx-2" />
          <p className="text-neutral-400 text-xs">{project.foundedOn}</p>
        </div>
      </div>
    </div>
  );
};

const FoundersSection = ({ project }: { project: IProjectData }) => {
  const hasFounders = project.founders && project.founders.length > 0;
  if (!hasFounders) {
    return null;
  }

  const visibleFounders = project.founders.slice(0, 4);
  const moreFoundersCount = project.founders.length - visibleFounders.length;

  return (
    <div className="w-full py-4 border-b border-b-neutral-800 border-dashed">
      <div className="w-full pl-6 pr-3 mb-2">
        <p className="text-neutral-300 text-sm">Founders</p>
      </div>
      {visibleFounders.map(({ name, linkedinUrl, twitterUrl, role, preferTwitterUrl }) => {
        const getFounderUrl = () => {
          if (preferTwitterUrl && !isEmpty(twitterUrl)) {
            return twitterUrl;
          }

          if (!isEmpty(linkedinUrl)) {
            return linkedinUrl;
          }

          if (!isEmpty(twitterUrl)) {
            return twitterUrl;
          }

          return null;
        };
        const founderUrl = getFounderUrl();

        return (
          <Link key={name} type="external" dest={founderUrl} fillContainer openInNewWindow>
            <div className="w-full flex pl-6 py-2 pr-3 items-center hover:bg-neutral-900">
              <div className="flex flex-row items-center">
                <p className="text-neutral-400 text-sm inline whitespace-nowrap">{name}</p>
                {role && (
                  <>
                    <div className="w-1 h-1 bg-neutral-400 rounded-full mx-1.5" />
                    <p className="text-neutral-500 text-xs inline whitespace-nowrap">{role}</p>
                  </>
                )}
              </div>
            </div>
          </Link>
        );
      })}
      {moreFoundersCount > 0 && (
        <div className="w-full pl-6 pr-3 py-2">
          <p className="text-neutral-400 text-sm">{moreFoundersCount} more...</p>
        </div>
      )}
    </div>
  );
};

const LinkToWebsite = ({ url }) => {
  return (
    <Link type="external" dest={url} fillContainer openInNewWindow>
      <div className="w-full flex py-2.5 items-center justify-center hover:bg-neutral-900">
        <div className="flex flex-row items-center">
          <p className="text-neutral-400 text-sm inline">website</p>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="text-neutral-400 w-2.5 h-2.5 ml-1.5"
          />
        </div>
      </div>
    </Link>
  );
};

const ResourcesSection = ({ project }: { project: IProjectData }) => {
  const hideLinks = isEmpty(project.siteLinks?.documentation);
  if (hideLinks) {
    return null;
  }

  return (
    <div className="w-full py-2.5 border-t border-t-neutral-800 border-dashed">
      <div className="w-full pl-6 pr-3 mb-2">
        <p className="text-neutral-300 text-sm">Links</p>
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-1.5 w-full pl-6 pr-3 mb-1">
        {!isEmpty(project.siteLinks?.documentation) && (
          <SiteLink url={project.siteLinks?.documentation} icon={faBook} label="documentation" />
        )}
        {!isEmpty(project.siteLinks?.playground) && (
          <SiteLink url={project.siteLinks?.playground} icon={faSliders} label="playground" />
        )}
      </div>
    </div>
  );
};
const SiteLink = ({ url, icon, label }) => {
  return (
    <Link type="external" dest={url} fillContainer={false} openInNewWindow>
      <div className="flex flex-row items-center w-fit h-fit px-4 py-1 bg-neutral-900 hover:bg-neutral-800 border border-solid border-neutral-800 rounded-full">
        <FontAwesomeIcon icon={icon} className="text-neutral-400 w-2.5 h-2.5 mr-1.5" />
        <p className="text-neutral-400 text-xs inline">{label}</p>
      </div>
    </Link>
  );
};

const SocialsSection = ({ project }: { project: IProjectData }) => {
  const hideSocials = isEmpty(project.socials);
  if (hideSocials) {
    return null;
  }

  return (
    <div className="w-full py-3 border-t border-t-neutral-800 border-dashed">
      <div className="flex flex-row w-full px-6">
        {Object.keys(project.socials).map((socialType) => {
          const url = project.socials[socialType];
          if (isEmpty(url)) {
            return null;
          }

          return <SocialLink key={socialType} type={socialType} url={url} />;
        })}
      </div>
    </div>
  );
};
const SocialLink = ({ type, url }) => {
  const getIcon = () => {
    switch (type) {
      case 'discord':
        return <FontAwesomeIcon icon={faDiscord} className="text-neutral-400 w-4 h-4" />;
      case 'github':
        return <FontAwesomeIcon icon={faGithub} className="text-neutral-400 w-4 h-4" />;
      case 'twitter':
        return <XLogo className="w-3 h-3" stroke="fill-white" />;
      case 'linkedin':
        return <FontAwesomeIcon icon={faLinkedin} className="text-neutral-400 w-4 h-4" />;
      case 'youtube':
        return <FontAwesomeIcon icon={faYoutube} className="text-neutral-400 w-4 h-4" />;
      default:
        return null;
    }
  };
  const Icon = getIcon();

  return (
    <div className="w-fit h-fit mr-2">
      <Link type="external" dest={url} fillContainer openInNewWindow>
        <div className="flex flex-row w-8 h-8 items-center justify-center bg-neutral-900 hover:bg-neutral-800 border border-solid border-neutral-800 rounded-lg">
          {Icon}
        </div>
      </Link>
    </div>
  );
};

const LogoImage = ({ src }) => {
  return <img src={src} className="w-[125px] h-[125px] rounded-lg" draggable={false} />;
};

export default ProjectContent;
