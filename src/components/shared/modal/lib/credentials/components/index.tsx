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
