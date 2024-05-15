import { FaqWhereAreCredentialsStored, SetCredentialsModalUI } from '../components';
import { ProviderId, Providers } from '../../../../../../fixtures/providers';

import { EmptyObject } from '../../../../../../types/empty';
import { FunctionComponent } from 'react';
import { ModalId } from '../../../modal-id';
import SetCredentialsModal from '../SetCredentialsModal';

const SetHumeCredentialsModal: FunctionComponent<EmptyObject> = () => {
  return (
    <SetCredentialsModal
      modalId={ModalId.SetHumeCredentials}
      providerId={ProviderId.Hume}
      title="Set Hume API Key"
      description="Set your Hume API key to begin conversations."
      logoPath={Providers.Hume.logo.localPath}
      credentialsUrl={Providers.Hume.links.credentials}
      siteHostname={Providers.Hume.siteHostname}
      credentialFields={['apiKey']}
      faqItems={[
        [
          <SetCredentialsModalUI.Faq.Title label="Where can I find my Hume API key?" />,
          <span className="text-sm">
            <SetCredentialsModalUI.Faq.Text text="Your Hume API key will be in your " />
            <SetCredentialsModalUI.Faq.Link
              dest={Providers.Hume.links.dashboard}
              anchor="Hume dashboard"
            />
            <SetCredentialsModalUI.Faq.Text text=" in the " />
            <SetCredentialsModalUI.Faq.Link
              dest={Providers.Hume.links.credentials}
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
