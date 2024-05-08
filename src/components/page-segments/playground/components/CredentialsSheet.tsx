import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../../../shared/shadcn/components/ui/accordion';
import { FunctionComponent, useContext } from 'react';
import { Sheet, SheetClose, SheetContent } from '../../../shared/shadcn/components/ui/sheet';

import { Cross2Icon } from '@radix-ui/react-icons';
import { EXTERNAL_LINKS } from '../../../../helpers/urls';
import { EmptyObject } from '../../../../types/empty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '../../../shared/elements/Link';
import { PlaygroundContext } from '../../../../context/playground';
import VapiCredentialsCard from '../credentials/cards/lib/VapiCredentialsCard';
import { faComments } from '@fortawesome/free-solid-svg-icons';

const CredentialsSheet: FunctionComponent<EmptyObject> = () => {
  const { credentialsDrawerOpen, toggleCredentialsDrawer } = useContext(PlaygroundContext);

  const handleOpenChange = (open: boolean) => {
    toggleCredentialsDrawer(open);
  };

  return (
    <Sheet open={credentialsDrawerOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        className="w-full sm:w-[525px] border-l-neutral-800 pt-6 px-0 pb-16 overflow-y-auto"
        style={{
          backdropFilter: 'blur(30px)',
          backgroundColor: 'rgba(60, 60, 60, 0.2)'
        }}
      >
        <CloseX />

        <Header />
        <ConversationProviders />
        <Faq />
      </SheetContent>
    </Sheet>
  );
};

const ConversationProviders = () => {
  return (
    <div className="px-6 pt-5 pb-7 border-solid border-b border-b-neutral-800">
      <div className="mb-5">
        <div className="flex flex-row items-center mb-0.5">
          <FontAwesomeIcon
            icon={faComments}
            className="text-neutral-300 mr-2"
            style={{ width: '14px', height: '14px' }}
          />
          <p className="text-neutral-300 text-xl font-medium">Conversation</p>
        </div>
        <p className="text-neutral-500 text-sm font-medium">
          These providers offer APIs for real-time, human-like, conversation.
        </p>
      </div>
      <VapiCredentialsCard />
    </div>
  );
};

const Header = () => {
  return (
    <div className="px-6 pb-5 border-solid border-b border-b-neutral-800">
      <p className="text-neutral-300 text-xl font-medium mb-1">Credentials</p>
      <p className="text-neutral-500 text-md font-medium">
        Set your credentials for different providers.{' '}
      </p>
    </div>
  );
};

const Faq = () => {
  const items = [
    [
      <div className="text-neutral-400">Where are credentials stored?</div>,
      <>
        <div className="mb-2">
          <FaqText text="Keys get stored in your browser’s " />
          <FaqLink dest={EXTERNAL_LINKS.RANDOM.WEB_STORAGE} anchor="Session Storage" />
          <FaqText text=". This is done so your credentials survive page refresh." />
        </div>
        <div className="mb-2">
          <FaqText text="Credentials will only be available in the tab you set them in. When you close this tab, all credential data gets cleared." />
        </div>
        <div className="mb-2">
          <FaqText text="Keys are never saved remotely. If cautious, you can use test credentials (that can be deleted later)." />
        </div>
      </>
    ]
  ];

  return (
    <div className="pt-5 px-5">
      <p className="text-neutral-400 text-lg font-medium">FAQ</p>
      <Accordion type="single" collapsible>
        {items.map(([trigger, content], index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="border-dashed border-b-neutral-700"
          >
            <AccordionTrigger>{trigger}</AccordionTrigger>
            <AccordionContent>{content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

const FaqText = ({ text }) => {
  return <p className="text-neutral-200 text-sm inline leading-6">{text}</p>;
};
const FaqLink = ({ dest, anchor }) => {
  return (
    <Link type="external" dest={dest} fillContainer={false}>
      {anchor}
    </Link>
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
