import { isEmpty } from '../helpers/empty';
import { useRouter } from 'next/router';

export const useProjectSlug = () => {
  const router = useRouter();
  let { projectSlug } = router.query as { projectSlug: string };

  if (isEmpty(projectSlug)) {
    projectSlug = undefined;
  }

  return { projectSlug };
};
