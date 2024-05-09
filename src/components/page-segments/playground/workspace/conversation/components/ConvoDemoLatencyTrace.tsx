import { FunctionComponent } from 'react';
import InfoTooltip from '../../../../../shared/tooltip/InfoTooltip';
import clsx from 'clsx';

interface ConvoDemoLatencyTraceProps {
  readings: Array<number>;
}

const MAX_VISIBLE_READINGS = 7;

const ConvoDemoLatencyTrace: FunctionComponent<ConvoDemoLatencyTraceProps> = ({ readings }) => {
  const visibleReadings = readings.slice(0, MAX_VISIBLE_READINGS);
  const showPlaceholderPill = readings.length === 0;

  return (
    <div>
      <Header />
      <div className="flex flex-col items-end">
        {showPlaceholderPill && <PlaceholderPill />}

        {visibleReadings.map((latencyMs, i) => (
          <LatencyPill key={i} latencyMs={latencyMs} index={i} />
        ))}
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="flex flex-row justify-center mb-2.5">
      <p className="text-neutral-300 text-sm inline mr-2">Latency (voice-to-voice)</p>
      <InfoTooltip
        text="Latency from (the time you stop speaking) → to (the moment AI speech audibly plays), in milliseconds."
        sizePx={10}
        infoIconColor="text-neutral-100"
      />
    </div>
  );
};

const LatencyPill = ({ latencyMs, index }: { latencyMs: number; index: number }) => {
  const getOpacity = (index: number) => {
    if (index === 0) return 1;
    if (index === 1) return 0.6;
    if (index === 2) return 0.5;
    if (index === 3) return 0.4;
    if (index === 4) return 0.3;
    if (index === 5) return 0.3;
    if (index === 6) return 0.2;

    return 0;
  };
  const opacity = getOpacity(index);

  const className = clsx({
    'w-fit h-fit px-4 py-1': true,
    'mb-1.5 last:mb-0': true,
    'bg-emerald-700 bg-opacity-75 hover:bg-opacity-50 border border-solid border-emerald-600':
      latencyMs <= 1000,
    'bg-amber-700 bg-opacity-75 hover:bg-opacity-50 border border-solid border-amber-600':
      latencyMs > 1000 && latencyMs <= 1500,
    'bg-rose-800 bg-opacity-75 hover:bg-opacity-50 border border-solid border-rose-600':
      latencyMs > 1500,
    'rounded-full': true,
    'select-none': true
  });

  return (
    <div className={className} style={{ opacity }}>
      <p className="text-neutral-300 text-xs">{latencyMs}ms</p>
    </div>
  );
};

const PlaceholderPill = () => {
  return (
    <div className="w-fit h-fit px-4 py-1 mb-1.5 bg-neutral-900 border border-solid border-neutral-800 rounded-full select-none">
      <p className="text-neutral-300 text-xs">waiting for speech</p>
    </div>
  );
};

export default ConvoDemoLatencyTrace;
