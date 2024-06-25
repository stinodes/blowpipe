import Play from '../common/icons/play.svg?component-solid';
import Pause from '../common/icons/pause.svg?component-solid';
import Forward from '../common/icons/forward.svg?component-solid';
import Backward from '../common/icons/backward.svg?component-solid';
import { ControlButton } from './ControlButton';
import { createSignal } from 'solid-js';
import { PopOut } from '../common/components/PopOut';

type Props = {
  playing: boolean;
  progress: string;
  onPause: (b: boolean) => void;
  onForward: (n: number) => void;
  onBackward: (n: number) => void;
};
export const PlaybackControls = (props: Props) => {
  return (
    <div class="flex items-center px-4">
      <ControlButton
        class="w-10"
        icon={Backward}
        onClick={() => props.onBackward(5)}
      />
      <ControlButton
        icon={props.playing ? Pause : Play}
        onClick={() => props.onPause(!props.playing)}
      />
      <ControlButton
        class="w-10"
        icon={Forward}
        onClick={() => props.onForward(5)}
      />
      <p class="text-lg font-medium text-gray-200 ml-4">{props.progress}</p>
      <div class="flex-1" />

      <div></div>
    </div>
  );
};
