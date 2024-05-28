import { FaqWhereAreCredentialsStored, SetCredentialsModalUI } from '../components';

import { EmptyObject } from '../../../../../../types/empty';
import { FunctionComponent } from 'react';
import { ModalId } from '../../../modal-id';
import { Projects } from '../../../../../../fixtures/projects';
import SetCredentialsModal from '../SetCredentialsModal';

const SetHumeCredentialsModal: FunctionComponent<EmptyObject> = () => {
  return (
    <SetCredentialsModal
      modalId={ModalId.SetHumeCredentials}
      providerId={Projects.Hume.id}
      title="Set Hume API Key"
      description="Set your Hume API key to begin conversations."
      logoPath={Projects.Hume.logo.localPath}
      credentialsUrl={Projects.Hume.siteLinks.credentials}
      siteHostname={Projects.Hume.siteHostname}
      credentialFields={['apiKey']}
      faqItems={[
        [
          <SetCredentialsModalUI.Faq.Title label="Where can I find my Hume API key?" />,
          <span className="text-sm">
            <SetCredentialsModalUI.Faq.Text text="Your Hume API key will be in your " />
            <SetCredentialsModalUI.Faq.Link
              dest={Projects.Hume.siteLinks.dashboard}
              anchor="dashboard"
            />
            <SetCredentialsModalUI.Faq.Text text=" in the " />
            <SetCredentialsModalUI.Faq.Link
              dest={Projects.Hume.siteLinks.credentials}
              anchor={`"API keys" section`}
            />
            <SetCredentialsModalUI.Faq.Text text={`. Copy & paste the "API key" field above.`} />
          </span>
        ],
        FaqWhereAreCredentialsStored
      ]}
      bannerBackgroundColor="#FCF4E9"
    />
  );
};

export default SetHumeCredentialsModal;
