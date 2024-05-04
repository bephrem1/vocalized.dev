import { ProviderId, Providers } from '../../../../../../fixtures/providers';

import { EmptyObject } from '../../../../../../types/empty';
import { FunctionComponent } from 'react';
import Link from '../../../../elements/Link';
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
      homepageUrl={Providers.Vapi.links.homepage}
      siteHostname={Providers.Vapi.siteHostname}
      credentialFields={['publicKey']}
      faqItems={[
        [
          <div className="text-neutral-400">Where can I find my Vapi public key?</div>,
          <span className="text-sm">
            <p className="text-neutral-200 inline leading-6">
              Your Vapi public key will be in your{' '}
            </p>
            <Link type="external" dest={Providers.Vapi.links.dashboard}>
              dashboard
            </Link>
            <p className="text-neutral-200 inline leading-6"> in the </p>
            <Link type="external" dest={Providers.Vapi.links.credentials}>
              "organization" tab
            </Link>
            <p className="text-neutral-200 inline leading-6">. Copy & paste it above.</p>
          </span>
        ]
      ]}
      bannerBackgroundColor="#092032"
    />
  );
};

export default SetVapiCredentialsModal;
