import { FunctionComponent, useContext } from 'react';
import { Sheet, SheetClose, SheetContent } from '../../../shared/shadcn/components/ui/sheet';

import { Cross2Icon } from '@radix-ui/react-icons';
import { EmptyObject } from '../../../../types/empty';
import { PlaygroundContext } from '../../../../context/playground';

const CredentialsSheet: FunctionComponent<EmptyObject> = () => {
  const { credentialsDrawerOpen, toggleCredentialsDrawer } = useContext(PlaygroundContext);

  const handleOpenChange = (open: boolean) => {
    toggleCredentialsDrawer(open);
  };

  return (
    <Sheet open={credentialsDrawerOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        className="w-full sm:w-[525px] border-l-neutral-800"
        style={{
          backdropFilter: 'blur(30px)',
          backgroundColor: 'rgba(60, 60, 60, 0.2)'
        }}
      >
        <div className="">
          <p className="text-neutral-300 text-xl font-medium mb-1">Credentials</p>
          <p className="text-neutral-500 text-md font-medium">
            Set your credentials for different providers.{' '}
          </p>
        </div>
        <CloseX />
      </SheetContent>
    </Sheet>
  );
};

const CloseX = () => {
  return (
    <SheetClose className="absolute right-6 top-6 p-[1px] bg-neutral-600 border-solid border-neutral-500 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
      <Cross2Icon style={{ height: '19px', width: '19px' }} />
      <span className="sr-only">Close</span>
    </SheetClose>
  );
};

export default CredentialsSheet;
