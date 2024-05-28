import { FaqWhereAreCredentialsStored, SetCredentialsModalUI } from '../components';

import { EmptyObject } from '../../../../../../types/empty';
import { FunctionComponent } from 'react';
import { ModalId } from '../../../modal-id';
import { Projects } from '../../../../../../fixtures/projects';
import SetCredentialsModal from '../SetCredentialsModal';

const SetBlandCredentialsModal: FunctionComponent<EmptyObject> = () => {
  return (
    <SetCredentialsModal
      modalId={ModalId.SetBlandCredentials}
      providerId={Projects.Bland.id}
      title="Set Bland API Key"
      description="Set your Bland credentials to begin conversations."
      logoPath={Projects.Bland.logo.localPath}
      credentialsUrl={Projects.Bland.siteLinks.credentials}
      siteHostname={Projects.Bland.siteHostname}
      credentialFields={['apiKey']}
      faqItems={[
        [
          <SetCredentialsModalUI.Faq.Title label="Where do I find my Bland API key?" />,
          <span className="text-sm">
            <SetCredentialsModalUI.Faq.Text text="Your Bland API key will be in your " />
            <SetCredentialsModalUI.Faq.Link
              dest={Projects.Bland.siteLinks.dashboard}
              anchor="developer portal"
            />
            <SetCredentialsModalUI.Faq.Text text=" in the " />
            <SetCredentialsModalUI.Faq.Link
              dest={Projects.Bland.siteLinks.credentials}
              anchor={`"API Key" tab`}
            />
            <SetCredentialsModalUI.Faq.Text text=" of your account settings. Copy & paste it above." />
          </span>
        ],
        FaqWhereAreCredentialsStored
      ]}
      bannerBackgroundColor="#EBECE7"
    />
  );
};

export default SetBlandCredentialsModal;
