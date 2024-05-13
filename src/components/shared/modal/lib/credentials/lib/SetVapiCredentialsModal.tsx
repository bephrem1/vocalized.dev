import { FaqWhereAreCredentialsStored, SetCredentialsModalUI } from '../components';
import { ProviderId, Providers } from '../../../../../../fixtures/providers';

import { EmptyObject } from '../../../../../../types/empty';
import { FunctionComponent } from 'react';
import { ModalId } from '../../../modal-id';
import SetCredentialsModal from '../SetCredentialsModal';

const SetVapiCredentialsModal: FunctionComponent<EmptyObject> = () => {
  return (
    <SetCredentialsModal
      modalId={ModalId.SetVapiCredentials}
      providerId={ProviderId.Vapi}
      title="Set Vapi Public Key"
      description="Set your Vapi credentials to begin conversations."
      logoPath={Providers.Vapi.logo.localPath}
      credentialsUrl={Providers.Vapi.links.credentials}
      siteHostname={Providers.Vapi.siteHostname}
      credentialFields={['publicKey']}
      faqItems={[
        [
          <SetCredentialsModalUI.Faq.Title label="Where do I find my Vapi public key?" />,
          <span className="text-sm">
            <SetCredentialsModalUI.Faq.Text text="Your Vapi public key will be in your " />
            <SetCredentialsModalUI.Faq.Link
              dest={Providers.Vapi.links.dashboard}
              anchor="dashboard"
            />
            <SetCredentialsModalUI.Faq.Text text=" in the " />
            <SetCredentialsModalUI.Faq.Link
              dest={Providers.Vapi.links.credentials}
              anchor={`"organization" tab`}
            />
            <SetCredentialsModalUI.Faq.Text text=". Copy & paste it above." />
          </span>
        ],
        FaqWhereAreCredentialsStored
      ]}
      bannerBackgroundColor="#092032"
    />
  );
};

export default SetVapiCredentialsModal;
