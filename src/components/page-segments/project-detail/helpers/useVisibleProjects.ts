import { IProjectData, Projects } from '../../../../fixtures/projects';

import { useMemo } from 'react';

export const useVisibleProjects = ({
  searchFilter
}: {
  searchFilter: string;
}): Array<IProjectData> => {
  const normalizedFilter = searchFilter?.toLowerCase();

  const visibleProjects = useMemo(() => {
    if (!normalizedFilter) return Object.values(Projects);

    return Object.values(Projects).filter((project) => {
      return (
        project.slug.toLowerCase().includes(normalizedFilter) ||
        project.displayName.toLowerCase().includes(normalizedFilter) ||
        (project.tagline && project.tagline.toLowerCase().includes(normalizedFilter)) ||
        (project.foundedOn && project.foundedOn.toLowerCase().includes(normalizedFilter)) ||
        (project.description &&
          ((project.description.short &&
            project.description.short.toLowerCase().includes(normalizedFilter)) ||
            (project.description.long &&
              project.description.long.toLowerCase().includes(normalizedFilter)))) ||
        project.siteHostname.toLowerCase().includes(normalizedFilter) ||
        (project.founders &&
          project.founders.some((founder) =>
            founder.name.toLowerCase().includes(normalizedFilter)
          )) ||
        (project.timelineNotes &&
          Object.values(project.timelineNotes).some((note) =>
            note.toLowerCase().includes(normalizedFilter)
          )) ||
        (project.githubRepositories &&
          project.githubRepositories.some((repo) =>
            repo.toLowerCase().includes(normalizedFilter)
          )) ||
        (project.specialUrls &&
          project.specialUrls.some((url) => url.toLowerCase().includes(normalizedFilter))) ||
        (project.tags &&
          project.tags.some((tag) => tag.toString().toLowerCase().includes(normalizedFilter)))
      );
    });
  }, [searchFilter]);

  return visibleProjects;
};
