import { createSignal, onCleanup, onMount } from 'solid-js';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
import Player from 'video.js/dist/types/player';
import 'videojs-contrib-quality-levels';
import './playr.css';

export type Quality = {
  label: string;
  src?: string;
  type?: string;
};
type Props = {
  class?: string;
  dash?: string;
  qualityOptions: Quality[];
};

export const Playr = (props: Props) => {
  let videoContainerRef: undefined | HTMLDivElement = undefined;
  let playerRef: undefined | Player;
  const [theatre, setTheatre] = createSignal(true);

  onMount(() => {
    const vidjsEl = document.createElement('video-js');
    videoContainerRef?.prepend(vidjsEl);
    playerRef = videojs(
      vidjsEl,
      {
        autoplay: false,
        vhs: { overrideNative: true },
        controlBar: {
          playToggle: true,
          currentTimeDisplay: true,
          timeDivider: true,
          durationDisplay: true,
          volumePanel: true,

          progressControl: true,
          remainingTimeDisplay: false,
        },
      },
      () => {
        console.log('REDY');
        const levels = playerRef?.qualityLevels();
        levels.on('addqualitylevel', function (event) {
          console.log(event);
        });
        setTimeout(() => {
          console.log(playerRef?.qualityLevels());
        }, 2000);
        playerRef?.fill(true);
        playerRef?.controls(true);
        console.log(props.qualityOptions);
        playerRef?.src(props.qualityOptions);
      },
    );
  });

  onCleanup(() => {
    playerRef && playerRef.dispose();
  });

  return (
    <div
      ref={videoContainerRef}
      class={`relative bg-black aspect-video ${
        theatre() ? 'w-full' : 'w-3/4 mt-4'
      } mx-auto flex flex-col justify-center items-center rounded-lg  overflow-hidden ${
        props.class
      } playr`}
    ></div>
  );
};
