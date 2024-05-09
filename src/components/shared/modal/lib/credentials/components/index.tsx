import { EXTERNAL_LINKS } from '../../../../../../helpers/urls';
import Link from '../../../../elements/Link';

export const SetCredentialsModalUI = {
  Faq: {
    Title: ({ label }) => {
      return <div className="text-neutral-400">{label}</div>;
    },
    Text: ({ text }) => {
      return <p className="text-neutral-200 text-sm inline leading-6">{text}</p>;
    },
    Link: ({ dest, anchor }) => {
      return (
        <Link type="external" dest={dest} fillContainer={false}>
          {anchor}
        </Link>
      );
    }
  }
};

export const FaqWhereAreCredentialsStored = [
  <SetCredentialsModalUI.Faq.Title label="Where are credentials stored?" />,
  <span className="text-sm">
    <div className="mb-2">
      <SetCredentialsModalUI.Faq.Text text="Keys are stored in your browser’s " />
      <SetCredentialsModalUI.Faq.Link
        dest={EXTERNAL_LINKS.RANDOM.WEB_STORAGE}
        anchor="Session Storage"
      />
      <SetCredentialsModalUI.Faq.Text text=". This is done so your credentials survive page refresh." />
    </div>
    <div>
      <SetCredentialsModalUI.Faq.Text text="Keys are never stored remotely." />
    </div>
  </span>
] as [JSX.Element, JSX.Element];
