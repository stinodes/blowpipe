import { useParams } from '@solidjs/router';
import { createResource } from 'solid-js';
import { api, baseUrlSignal } from '../api';
import { Playr, Quality } from '../playr';

export const Watch = () => {
  const params = useParams();
  const [video] = createResource(() => params.videoId, api.video);

  const streams = () => {
    const vid = video();
    if (!vid) return [];
    return vid.formatStreams
      .map(
        (s) =>
          ({
            type: s.type,
            src: `${baseUrlSignal[0]()}/videoplayback?${
              s.url.split('?')[1]
            }&lang=en&local=true&hmac_key=ohhe4vaifoquuGhah9Oh`,
            label: s.qualityLabel,
          }) as Quality,
      )
      .concat([
        {
          type: 'application/dash+xml',
          src: `${baseUrlSignal[0]()}${
            vid.dashUrl
          }?local=true&hmac_key=ohhe4vaifoquuGhah9Oh`,
          label: 'auto',
        } as Quality,
      ]);
  };

  return (
    <div class="overflow-y-scroll">
      {video.state === 'ready' || video.state === 'refreshing' ? (
        <>
          {console.log(video())}
          <div class="w-full">
            <Playr qualityOptions={streams().reverse()} />
          </div>
          <div class="m-4 text-gray-200 w-2/3">
            <h3 class="text-2xl font-semibold">{video()?.title}</h3>
            <div class="flex mt-4 justify-between">
              <a href="#" class="flex rounded-md hover:bg-gray-800/30 w-1/3">
                <div class="aspect-square rounded-md overflow-hidden">
                  <img
                    class="block h-full"
                    src={`${video()?.authorThumbnails[2].url}`}
                  />
                </div>
                <div class="p-4">
                  <h4 class="font-medium text-md text-violet-300">
                    {video()?.author}
                  </h4>
                  <p>{video()?.subCountText} Subscribers</p>
                </div>
              </a>
              <div class="flex flex-col ml-4 text-right justify-center">
                <p>
                  {video()?.viewCount} views | {video()?.likeCount} likes
                </p>
                <p>Uploaded {video()?.publishedText}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div class="py-6 mx-auto w-96">
          <h3 class="font-bold text-lg text-gray-200">Loading...</h3>
        </div>
      )}
    </div>
  );
};
