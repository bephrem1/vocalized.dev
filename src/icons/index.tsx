import { FunctionComponent } from 'react';

export interface BaseIconProps {
  className?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
  alt?: string;
}

export const getBaseSvgProps = ({ iconName }: { iconName: string }) => {
  return {
    'aria-labelledby': getSVGAccessibilityTitleId(iconName),
    role: 'img',
    draggable: 'false'
  };
};

export const IconAccessibilityTitle: FunctionComponent<{ iconName: string; alt?: string }> = ({
  alt,
  iconName
}) => {
  return alt ? <title id={getSVGAccessibilityTitleId(iconName)}>{alt}</title> : null;
};

export const getSVGAccessibilityTitleId = (svgName: string) => {
  return `${svgName}-id`;
};
