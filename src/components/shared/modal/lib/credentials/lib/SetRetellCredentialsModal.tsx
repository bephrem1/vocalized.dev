import { FaqWhereAreCredentialsStored, SetCredentialsModalUI } from '../components';

import { EmptyObject } from '../../../../../../types/empty';
import { FunctionComponent } from 'react';
import { ModalId } from '../../../modal-id';
import { Projects } from '../../../../../../fixtures/projects';
import SetCredentialsModal from '../SetCredentialsModal';

const SetRetellCredentialsModal: FunctionComponent<EmptyObject> = () => {
  return (
    <SetCredentialsModal
      modalId={ModalId.SetRetellCredentials}
      providerId={Projects.Retell.id}
      title="Set Retell API Key"
      description="Set your Retell credentials to begin conversations."
      logoPath={Projects.Retell.logo.localPath}
      credentialsUrl={Projects.Retell.siteLinks.credentials}
      siteHostname={Projects.Retell.siteHostname}
      credentialFields={['apiKey']}
      faqItems={[
        [
          <SetCredentialsModalUI.Faq.Title label="Where do I find my Retell API key?" />,
          <span className="text-sm">
            <SetCredentialsModalUI.Faq.Text text="Your Retell API key will be in your " />
            <SetCredentialsModalUI.Faq.Link
              dest={Projects.Retell.siteLinks.dashboard}
              anchor="dashboard"
            />
            <SetCredentialsModalUI.Faq.Text text=" in the " />
            <SetCredentialsModalUI.Faq.Link
              dest={Projects.Retell.siteLinks.credentials}
              anchor={`"API Keys" tab`}
            />
            <SetCredentialsModalUI.Faq.Text text=". Copy & paste it above." />
          </span>
        ],
        FaqWhereAreCredentialsStored
      ]}
      bannerBackgroundColor="#ffffff"
    />
  );
};

export default SetRetellCredentialsModal;
