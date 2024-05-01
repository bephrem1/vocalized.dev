import { Empty } from '../types/empty';
import { FunctionComponent } from 'react';

export interface BaseIconProps {
  color?: string;
  width?: string;
  height?: string;
  alt?: string;
  style?: React.CSSProperties;
}

export const getSvgTagBaseOptions = ({
  iconName,
  width,
  height,
  style
}: {
  iconName: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties | Empty;
}) => {
  return {
    width,
    height,
    'aria-labelledby': getSVGAccessibilityTitleId(iconName),
    role: 'img',
    draggable: 'false',
    style: {
      ...style,
      minWidth: width,
      minHeight: height
    }
  };
};

export const IconAccessibilityTitle: FunctionComponent<{ iconName: string; alt?: string }> = ({
  alt,
  iconName
}) => {
  return alt ? <title id={getSVGAccessibilityTitleId(iconName)}>{alt}</title> : null;
};

const getSVGAccessibilityTitleId = (svgName: string) => {
  return `${svgName}-id`;
};
