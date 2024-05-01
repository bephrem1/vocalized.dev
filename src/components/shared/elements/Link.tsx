import { FunctionComponent } from 'react';
import { default as NextLink } from 'next/link';
import clsx from 'clsx';
import { isEmpty } from '../../../helpers/empty';

enum LinkTypes {
  internal = 'internal',
  external = 'external'
}
type LinkType = keyof typeof LinkTypes;

export interface LinkProps {
  type: LinkType;
  dest: string;
  bold?: boolean;
  openInNewWindow?: boolean;
  underline?: boolean;
  onClick?: (e?: any) => void;

  children?: React.ReactNode | Array<React.ReactNode>;
}

const Link: FunctionComponent<LinkProps> = ({
  type = LinkTypes.internal,
  dest,
  bold: isBold = false,
  openInNewWindow,
  underline = false,
  onClick,
  children
}) => {
  if (isEmpty(dest)) {
    return null;
  }

  const linkClass = clsx({
    'w-full h-full': true,
    'text-emerald-500 hover:text-emerald-400': true,
    'font-bold': isBold,
    underline: underline
  });

  const LinkTag = (
    <a
      className={linkClass}
      {...(type === LinkTypes.external && { href: dest })}
      {...(type === LinkTypes.external || openInNewWindow
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      {...(onClick ? { onClick } : {})}
    >
      {children}
    </a>
  );

  return type === LinkTypes.internal ? (
    <NextLink href={dest} legacyBehavior>
      {LinkTag}
    </NextLink>
  ) : (
    LinkTag
  );
};

export default Link;
