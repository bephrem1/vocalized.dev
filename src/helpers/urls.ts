import { NextRouter } from 'next/router';
import { isEmpty } from './empty';

export const INTERNAL_LINKS = {
  HOME: '/',
  PLAYGROUND: '/playground'
};

export const EXTERNAL_LINKS = {
  BEN: {
    TWITTER: 'https://twitter.com/notbenyam'
  }
};

export const getCurrentUrl = (router: NextRouter) => {
  return getFrontendUrl({ path: router.asPath });
};

export const getFrontendUrl = ({
  path,
  queryParams
}: {
  path: string;
  queryParams?: Record<string, any>;
}) => {
  return getUrlToResource({
    baseUrl: getBaseFrontendUrl(),
    resourcePath: path,
    queryParams
  });
};

export const getApiUrl = ({
  path,
  queryParams
}: {
  path: string;
  queryParams?: Record<string, any>;
}) => {
  return getUrlToResource({
    baseUrl: getBaseApiUrl(),
    resourcePath: path,
    queryParams
  });
};

const getUrlToResource = ({
  baseUrl,
  resourcePath,
  queryParams
}: {
  baseUrl: string;
  resourcePath: string;
  queryParams?: Record<string, string>;
}) => {
  // Adjust for trailing slash
  if (!!resourcePath && resourcePath.charAt(resourcePath.length - 1) === '/') {
    resourcePath = resourcePath.substring(0, resourcePath.length - 1);
  }

  // Adjust for leading slash
  if (!!resourcePath && resourcePath.charAt(0) !== '/') {
    resourcePath = '/' + resourcePath;
  }

  const queryParamString = queryParams ? getQueryParamString(queryParams) : '';

  return baseUrl + resourcePath + queryParamString;
};

const getQueryParamString = (queryParams: Record<string, string>): string => {
  if (!queryParams) {
    return '';
  }

  const paramItems = Object.keys(queryParams).map((paramLabel: string) => {
    const value = queryParams[paramLabel];
    if (isEmpty(value)) {
      return undefined;
    }

    return `${encodeURIComponent(paramLabel)}=${encodeURIComponent(value)}`;
  });

  return `?${paramItems.filter(Boolean).join('&')}`;
};

const getBaseFrontendUrl = () => {
  const host = process.env.NEXT_PUBLIC_HOSTNAME;

  return getBaseUrl({
    protocol: host === 'localhost' ? 'http' : 'https',
    host: process.env.NEXT_PUBLIC_HOSTNAME,
    port: process.env.NEXT_PUBLIC_HOSTNAME === 'localhost' ? ':3000' : ''
  });
};

const getBaseApiUrl = (): string => {
  const host = process.env.NEXT_PUBLIC_API_HOSTNAME;

  return getBaseUrl({
    protocol: host === 'localhost' ? 'http' : 'https',
    host: host,
    port: host === 'localhost' ? ':8000' : ''
  });
};

interface BaseUrlOptions {
  protocol: string;
  host: string;
  port: string;
  suffix?: string;
}
const getBaseUrl = ({ protocol, host, port, suffix }: BaseUrlOptions) => {
  return `${protocol}://${host}${port}${!!suffix ? suffix : ''}`;
};
