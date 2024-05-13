import { FaqWhereAreCredentialsStored, SetCredentialsModalUI } from '../components';
import { ProviderId, Providers } from '../../../../../../fixtures/providers';

import { EmptyObject } from '../../../../../../types/empty';
import { FunctionComponent } from 'react';
import { ModalId } from '../../../modal-id';
import SetCredentialsModal from '../SetCredentialsModal';

const SetBlandCredentialsModal: FunctionComponent<EmptyObject> = () => {
  return (
    <SetCredentialsModal
      modalId={ModalId.SetBlandCredentials}
      providerId={ProviderId.Bland}
      title="Set Bland API Key"
      description="Set your Bland credentials to begin conversations."
      logoPath={Providers.Bland.logo.localPath}
      credentialsUrl={Providers.Bland.links.credentials}
      siteHostname={Providers.Bland.siteHostname}
      credentialFields={['apiKey']}
      faqItems={[
        [
          <SetCredentialsModalUI.Faq.Title label="Where do I find my Bland API key?" />,
          <span className="text-sm">
            <SetCredentialsModalUI.Faq.Text text="Your Bland API key will be in your " />
            <SetCredentialsModalUI.Faq.Link
              dest={Providers.Bland.links.dashboard}
              anchor="developer portal"
            />
            <SetCredentialsModalUI.Faq.Text text=" in the " />
            <SetCredentialsModalUI.Faq.Link
              dest={Providers.Bland.links.credentials}
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
