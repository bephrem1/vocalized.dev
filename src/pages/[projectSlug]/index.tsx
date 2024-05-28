import { FunctionComponent, useEffect } from 'react';
import { IProjectData, getProjectBySlug } from '../../fixtures/projects';

import { EmptyObject } from '../../types/empty';
import Head from 'next/head';
import { INTERNAL_LINKS } from '../../helpers/urls';
import PageBase from '../../components/shared/page/PageBase';
import ProjectDetail from '../../components/page-segments/project-detail/ProjectDetail';
import { isEmpty } from '../../helpers/empty';
import { useProjectSlug } from '../../hooks/query-params';
import { useRouter } from 'next/router';

const ProjectPage: FunctionComponent<EmptyObject> = () => {
  const { tabTitle, project } = useProject();

  const router = useRouter();
  useEffect(() => {
    if (isEmpty(project)) {
      router.push(INTERNAL_LINKS.NOT_FOUND);
    }
  }, []);

  return (
    <PageBase>
      <Head>
        <title>{tabTitle}</title>
      </Head>
      {!isEmpty(project) && <ProjectDetail project={project} />}
    </PageBase>
  );
};

const useProject = (): { tabTitle: string; project: IProjectData } => {
  const { projectSlug } = useProjectSlug();
  if (isEmpty(projectSlug)) {
    return {
      tabTitle: 'Vocalized',
      project: null
    };
  }

  const project = getProjectBySlug(projectSlug);
  if (isEmpty(project)) {
    return {
      tabTitle: 'Vocalized',
      project: null
    };
  }

  return {
    tabTitle: `Vocalized | ${project.displayName}`,
    project
  };
};

export default ProjectPage;
