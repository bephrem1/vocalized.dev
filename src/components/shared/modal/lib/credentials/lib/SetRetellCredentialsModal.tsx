import { FaqWhereAreCredentialsStored, SetCredentialsModalUI } from '../components';
import { ProviderId, Providers } from '../../../../../../fixtures/providers';

import { EmptyObject } from '../../../../../../types/empty';
import { FunctionComponent } from 'react';
import { ModalId } from '../../../modal-id';
import SetCredentialsModal from '../SetCredentialsModal';

const SetRetellCredentialsModal: FunctionComponent<EmptyObject> = () => {
  return (
    <SetCredentialsModal
      modalId={ModalId.SetRetellCredentials}
      providerId={ProviderId.Retell}
      title="Set Retell API Key"
      description="Set your Retell credentials to begin conversations."
      logoPath={Providers.Retell.logo.localPath}
      homepageUrl={Providers.Retell.links.homepage}
      siteHostname={Providers.Retell.siteHostname}
      credentialFields={['apiKey']}
      faqItems={[
        [
          <SetCredentialsModalUI.Faq.Title label="Where do I find my Retell API key?" />,
          <span className="text-sm">
            <SetCredentialsModalUI.Faq.Text text="Your Retell API key will be in your " />
            <SetCredentialsModalUI.Faq.Link
              dest={Providers.Retell.links.dashboard}
              anchor="dashboard"
            />
            <SetCredentialsModalUI.Faq.Text text=" in the " />
            <SetCredentialsModalUI.Faq.Link
              dest={Providers.Retell.links.credentials}
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
