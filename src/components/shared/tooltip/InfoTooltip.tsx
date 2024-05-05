import { Tooltip, TooltipContent, TooltipTrigger } from '../shadcn/components/ui/tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';
import clsx from 'clsx';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

interface Props {
  text: string;
  sizePx?: number;
  infoIconColor?: string;
}

const InfoTooltip: FunctionComponent<Props> = ({
  text,
  sizePx = 10,
  infoIconColor = 'text-neutral-500'
}) => {
  return (
    <Tooltip>
      <TooltipTrigger className="flex flex-row items-center justify-center">
        <FontAwesomeIcon
          icon={faInfoCircle}
          className={infoIconColor}
          style={{ width: `${sizePx}px`, height: `${sizePx}px` }}
        />
      </TooltipTrigger>
      <TooltipContent className="max-w-[250px] my-1 bg-neutral-950 border border-dashed border-neutral-400">
        <p className="text-white leading-5">{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default InfoTooltip;
