import { EmptyObject } from '../../../types/empty';
import { FunctionComponent } from 'react';
import { INTERNAL_LINKS } from '../../../helpers/urls';
import Link from '../../shared/elements/Link';

const Home: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-row w-full h-full items-center justify-center">
        <Link type="internal" dest={INTERNAL_LINKS.PLAYGROUND}>
          <p className="text-white underline">playgrond</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
