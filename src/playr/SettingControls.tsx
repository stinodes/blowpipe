import { createSignal } from 'solid-js';
import Adjustments from '../common/icons/adjustments-h.svg?component-solid';
import ArrowsOut from '../common/icons/arrows-out.svg?component-solid';
import ArrowsIn from '../common/icons/arrows-in.svg?component-solid';
import { ControlButton } from './ControlButton';

type Props = {
  isTheatre: boolean;
  onTheatreChange: () => void;
  onQualityChange: (quality: string) => void;
  currentQuality: string;
  qualityOptions: string[];
};
export const SettingControls = (props: Props) => {
  const [showSettings, setShowSettings] = createSignal(false);

  return (
    <div class="flex items-center px-4">
      <ControlButton
        class="w-10"
        icon={props.isTheatre ? ArrowsIn : ArrowsOut}
        onClick={props.onTheatreChange}
      />
      <div>
        {showSettings() && (
          <div class="relative w-full">
            <div class="absolute bottom-0 right-0 w-20 rounded-md overflow-hidden">
              <div onMouseLeave={() => setShowSettings(false)}>
                {props.qualityOptions.map((q) => (
                  <button
                    class="bg-gray-950/70 hover:bg-gray-800/70 px-4 py-1 text-gray-200 w-full text-center"
                    onClick={() => props.onQualityChange(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <ControlButton
          class="w-10"
          icon={Adjustments}
          onClick={() => setShowSettings((p) => !p)}
        />
      </div>
    </div>
  );
};
